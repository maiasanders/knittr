package com.knittr.api.dao;

import com.knittr.api.model.Project;

import java.util.List;

public interface ProjectDao {
    Project getProjectById(int id);

    Project createProject(Project newProject);

    List<Project> getCurrentProjectsByUser(int userId);

    List<Project> getCompletedProjectsByUser(int userId);

    /**
     * Updates the current row of a project without changing other details
     * @param id projectId
     * @param currentRow the updated row count
     * @return project with updated row count
     */
    Project updateProjectProgress(int id, int currentRow);

    /**
     * Only alters the completed tag of a project in database
     * @param id project id
     * @return project with completed flag set to true
     */
    Project completeProject(int id);

    Project getTemplateProject(int varId);
}
