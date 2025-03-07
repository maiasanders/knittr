package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.*;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class JdbcProjectDao implements ProjectDao{
    private JdbcTemplate template;
    private NoteDao noteDao;
    private StepDao stepDao;

    private final String SELECT_CLAUSE =
            "SELECT p.project_id, pa.author, pa.pattern_name, pa.desc, pa.public, " +
            "u.username, p.maker_id, v.variant_id, v.pattern_id, " +
            "v.yarn_id, y.yarn_name, s.size_id, s.size_name, s.age_category, " +
            "p.yarns_used, p.current_row, p.completed, " +
            "pa.default_image, i.image_link, i.desc AS img_desc " +
            "FROM projects AS p " +
            "JOIN pattern_variants AS v ON p.variant_id = v.variant_id " +
            "LEFT JOIN yarn_types AS y ON v.yarn_id = y.yarn_id " +
            "LEFT JOIN sizes AS s ON v.size_id = s.size_id " +
            "LEFT JOIN patterns AS pa ON v.pattern_id = pa.pattern_id " +
            "LEFT JOIN users AS u ON pa.author = u.user_id " +
            "LEFT JOIN images AS i ON pa.default_image = i.image_id ";
    private final String CONNECT_ERR = "Unable to connect to database";

    @Override
    public Project getProjectById(int id) {
        String sql = SELECT_CLAUSE + "WHERE project_id = ?";
        try {
            Project project = template.queryForObject(sql, this::mapProject, id);
            try {
                project.setNotes(noteDao.getNotesByProject(id));
            } catch (DaoException e) {
                project.setNotes(new ArrayList<>());
            }
            try {
                project.setSteps(stepDao.getStepsByVariant(project.getVariant().getVariantId()));
            } catch (DaoException e) {
                project.setSteps(new ArrayList<>());
            }
            return project;
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Unable to find specified project");
        }
    }

    @Override
    public Project createProject(Project newProject) {
        String sql = "INSERT INTO projects (maker_id, variant_id, yarns_used, template_project) VALUES (?,?,?,?) RETURNING project_id";
        try {
            int id = template.queryForObject(
                    sql, Integer.class,
                    newProject.getMakerId(),
                    newProject.getVariant().getVariantId(),
                    newProject.getYarnsUsed(),
                    newProject.isTemplate()
            );
            return getProjectById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    @Override
    public List<Project> getCurrentProjectsByUser(int userId) {
        String sql = SELECT_CLAUSE + "WHERE p.maker_id = ? AND NOT p.completed ";
        try {
            return template.query(sql, this::mapProject, userId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    @Override
    public List<Project> getCompletedProjectsByUser(int userId) {
        String sql = SELECT_CLAUSE + "WHERE p.maker_id = ? AND p.completed ";
        try {
            return template.query(sql, this::mapProject, userId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    @Override
    public Project updateProjectProgress(int id, int currentRow) {
        String sql = "UPDATE projects SET current_row = ? WHERE project_id = ?";
        try {
            int rows = template.update(sql, currentRow, id);
            if (rows == 1) {
                return getProjectById(id);
            } else {
                throw new NotFoundException("Project you are trying to update not found");
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to update project due to data integrity violation");
        }
    }

    @Override
    public Project completeProject(int id) {
        String sql = "UPDATE projects SET completed = TRUE WHERE project_id = ?";
        try {
            int rows = template.update(sql, id);
            if (rows == 1) {
                return getProjectById(id);
            } else {
                throw new NotFoundException("Project not found");
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to mark as completed due to data integrity violation");
        }
    }

    @Override
    public Project getTemplateProject(int varId) {
        String sql = SELECT_CLAUSE + "WHERE v.variant_id = ? AND template_project = true";
        try {
            Project project = template.queryForObject(sql, this::mapProject, varId);
            List<Note> notes = noteDao.getNotesByProject(project.getProjectId());
            List<Step> steps = stepDao.getStepsByVariant(varId);
            project.setNotes(notes);
            project.setSteps(steps);
            return project;
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("No template project found");
        }

    }

    private Project mapProject(ResultSet set, int i) throws SQLException {
        Project project = new Project();
        project.setProjectId(set.getInt("project_id"));
        project.setMakerId(set.getInt("maker_id"));

        // create variant
        PatternVariant variant = new PatternVariant();
        variant.setVariantId(set.getInt("variant_id"));

        // create and set pattern
        Pattern pattern = new Pattern();
        pattern.setPatternId(set.getInt("pattern_id"));
        pattern.setName(set.getString("pattern_name"));
        // create user inst for author and set
        User author = new User(
                set.getString("username"),
                set.getInt("author")
        );
        pattern.setAuthor(author);
        pattern.setDesc(set.getString("desc"));
        pattern.setPublic(set.getBoolean("public"));
        // Get and add image TODO do I need to check a different column?
        if (set.getInt("default_image") != 0) {
            pattern.setDefaultImage(new Image(
                    set.getInt("default_image"),
                    set.getString("image_link"),
                    pattern.getPatternId(),
                    pattern.getAuthor(),
                    set.getString("img_desc")
            ));
        }
        project.setPattern(pattern);

        variant.setYarn( new Yarn(
                set.getInt("yarn_id"),
                set.getString("yarn_name") ) );
        variant.setSize( new Size(
                set.getInt("size_id"),
                set.getString("size_name"),
                set.getString("age_category")
        ) );
        project.setVariant(variant);

        project.setYarnsUsed(set.getString("yarns_used"));
        project.setCurrentRow(set.getInt("current_row"));
        project.setCompleted(set.getBoolean("completed"));

        return project;
    }
}
