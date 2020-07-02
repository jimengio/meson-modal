import React, { FC } from "react";
import { css } from "emotion";
import { JimoButton } from "@jimengio/jimo-basics";
import { attachModalThemeVariables } from "../../../src/theme";
import { DocBlock, DocDemo, DocSnippet } from "@jimengio/doc-frame";

let CustomThemePage: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={props.className}>
      <DocDemo title={"Custom Theme"}>
        <JimoButton
          text="修改 header 样式"
          onClick={() => {
            attachModalThemeVariables({
              modalCard: undefined,
              modalHeader: styleModalHeader,
              drawerCard: undefined,
              drawerHeader: styleDrawerHeader,
              closeIcon: styleCloseIcon,
            });

            alert("切换到其他页面查看");
          }}
        />

        <DocBlock content={content} />

        <DocSnippet code={code} />
      </DocDemo>
    </div>
  );
});

export default CustomThemePage;

let styleModalHeader = css`
  border-color: hsl(0, 0%, 60%);
`;

let styleDrawerHeader = css`
  border-color: hsl(0, 0%, 60%);
`;

let content = `定制主题`;

let code = `
attachModalThemeVariables({
  modalCard: undefined,
  modalHeader: styleModalHeader,
  drawerCard: undefined,
  drawerHeader: styleDrawerHeader,
});
`;

let styleCloseIcon = css`
  color: hsl(0, 0%, 60%);
`;
