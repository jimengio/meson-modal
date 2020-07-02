import { IRouteRule } from "@jimengio/ruled-router";

export const routerRules: IRouteRule[] = [
  { path: "home" },
  { path: "modal" },
  { path: "modal-center-title" },
  { path: "drawer" },
  {
    path: "confirm",
  },
  { path: "custom-theme" },
  { path: "", name: "home" },
];
