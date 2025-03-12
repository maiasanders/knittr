import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/patterns/mine": {};
  "/projects": {};
  "/patterns/saved": {};
  "/login": {};
  "/register": {};
  "/patterns/:id": {
    "id": string;
  };
  "/patterns/discover": {};
  "/patterns/new": {};
  "/patterns/new/:id/variants": {
    "id": string;
  };
  "/projects/:id/edit": {
    "id": string;
  };
  "/projects/:id": {
    "id": string;
  };
  "/variants/:id/template": {
    "id": string;
  };
  "/logout": {};
  "/*": {
    "*": string;
  };
};