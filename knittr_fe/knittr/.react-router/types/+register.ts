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
  "/projects/:id": {
    "id": string;
  };
  "/patterns/new": {};
  "/patterns/new/:id/variants": {
    "id": string;
  };
  "/variants/:id/template": {
    "id": string;
  };
  "/*": {
    "*": string;
  };
};