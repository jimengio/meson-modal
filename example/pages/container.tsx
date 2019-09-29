import React from "react";
import { column, row, fullscreen, expand } from "@jimengio/shared-utils";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css, cx } from "emotion";

import { HashRedirect, findRouteTarget } from "@jimengio/ruled-router/lib/dom";
import { genRouter } from "controller/generated-router";
import { DocSidebar, ISidebarEntry } from "@jimengio/doc-frame";
import DemoModal from "./demos/modal";
import DemoDrawer from "./demos/drawer";

let items: ISidebarEntry[] = [
  {
    title: "Modal",
    path: genRouter.modal.name,
  },
  {
    title: "Drawer",
    path: genRouter.drawer.name,
  },
];

let onSwitchPage = (path: string) => {
  let target = findRouteTarget(genRouter, path);
  if (target != null) {
    target.go();
  }
};

const renderChild = (router: IRouteParseResult) => {
  if (router != null) {
    switch (router.name) {
      case genRouter.modal.name:
        return <DemoModal />;
      case genRouter.drawer.name:
        return <DemoDrawer />;
      default:
        return (
          <HashRedirect to={genRouter.modal.name} delay={0.4}>
            Redirecting
          </HashRedirect>
        );
    }
  }
  return <div>NOTHING</div>;
};

export default (props) => {
  return (
    <div className={cx(fullscreen, row, styleContainer)}>
      <DocSidebar
        title="Meson Modal"
        currentPath={props.router.name}
        onSwitch={(item) => {
          onSwitchPage(item.path);
        }}
        items={items}
      />

      <div className={cx(expand, stylePage)}>{renderChild(props.router)}</div>
    </div>
  );
};

const styleContainer = css`
  font-family: "Helvetica";
`;

let stylePage = css`
  padding: 40px;
`;
