import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: string }) {
  return queryString.stringify(queries);
}

// generated

// Generated with router-code-generator@0.2.7

export let genRouter = {
  home: {
    name: "home",
    raw: "home",
    path: () => `/home`,
    go: () => switchPath(`/home`),
  },
  modal: {
    name: "modal",
    raw: "modal",
    path: () => `/modal`,
    go: () => switchPath(`/modal`),
  },
  modalCenterTitle: {
    name: "modal-center-title",
    raw: "modal-center-title",
    path: () => `/modal-center-title`,
    go: () => switchPath(`/modal-center-title`),
  },
  drawer: {
    name: "drawer",
    raw: "drawer",
    path: () => `/drawer`,
    go: () => switchPath(`/drawer`),
  },
  confirm: {
    name: "confirm",
    raw: "confirm",
    path: () => `/confirm`,
    go: () => switchPath(`/confirm`),
  },
  customTheme: {
    name: "custom-theme",
    raw: "custom-theme",
    path: () => `/custom-theme`,
    go: () => switchPath(`/custom-theme`),
  },
  $: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};

/** Deprecating, use GenRouterTypeTree["next"] instead */
export type GenRouterTypeMain = GenRouterTypeTree["next"];

export interface GenRouterTypeTree {
  next:
    | GenRouterTypeTree["home"]
    | GenRouterTypeTree["modal"]
    | GenRouterTypeTree["modalCenterTitle"]
    | GenRouterTypeTree["drawer"]
    | GenRouterTypeTree["confirm"]
    | GenRouterTypeTree["customTheme"]
    | GenRouterTypeTree["$"];
  home: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
  modal: {
    name: "modal";
    params: {};
    query: {};
    next: null;
  };
  modalCenterTitle: {
    name: "modal-center-title";
    params: {};
    query: {};
    next: null;
  };
  drawer: {
    name: "drawer";
    params: {};
    query: {};
    next: null;
  };
  confirm: {
    name: "confirm";
    params: {};
    query: {};
    next: null;
  };
  customTheme: {
    name: "custom-theme";
    params: {};
    query: {};
    next: null;
  };
  $: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
}
