import type { RouteConfig } from "@react-router/dev/routes"
import { index, layout, route } from "@react-router/dev/routes"

export default [
    index("pages/home.tsx"),
    layout("layouts/savedOptions.tsx", [
        route("/patterns/mine", "pages/myPatternsPage.tsx"),
        route("/projects", "pages/projectsListPage.tsx"),
        route("/patterns/saved", "pages/savedPatternPage.tsx")
    ]),
    route("/login", "pages/loginPage.tsx"),
    route("/register", "pages/registerPage.tsx"),
    route("/patterns/:id", "pages/patternDetailsPage.tsx"),
    route("/patterns/discover", "pages/publicPatternPage.tsx"),
    layout("layouts/createPattern.tsx", [
        route("/patterns/new", "pages/newPatternPage.tsx"),
        route("/patterns/new/:id/variants", "pages/createVariant.tsx")
    ]),
    layout("layouts/projectLayout.tsx", [
        route("/projects/:id/edit", "pages/editProjectPage.tsx"),
        route("/projects/:id", "pages/projectPage.tsx"),
    ]),
    route("/variants/:id/template", "pages/variantRedirect.tsx"),
    route("/logout", "pages/logout.tsx"),
    // layout("layouts/loginRequired.tsx", [
    // ]),
    route("/*", "pages/notFoundPage.tsx")
] satisfies RouteConfig
