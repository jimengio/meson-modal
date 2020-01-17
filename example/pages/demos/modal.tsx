import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonModal from "../../../src/modal";
import { DocDemo, DocBlock, DocSnippet } from "@jimengio/doc-frame";
import { JimoButton } from "@jimengio/jimo-basics";

let code = `
<MesonModal
  title={"DEMO modal"}
  visible={visible}
  onClose={() => {
    setVisible(false);
  }}
  renderContent={() => {
    return "TODO";
  }}
/>
`;

let DemoModal: FC<{}> = (props) => {
  let [visible, setVisible] = useState(false);
  let [noMovingVisible, setNoMovingVisible] = useState(false);

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <div>
          <DocDemo title="Modal" link={"https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/modal.tsx"}>
            <JimoButton
              onClick={() => {
                setVisible(true);
              }}
              text="Try Modal"
            />
            <DocSnippet code={code} />
            <MesonModal
              title={"DEMO modal"}
              visible={visible}
              onClose={() => {
                setVisible(false);
              }}
              renderContent={() => {
                return (
                  <div>
                    SOMETHING....
                    <span
                      onClick={() => {
                        setVisible(false);
                      }}
                    >
                      Close
                    </span>
                  </div>
                );
              }}
            />
          </DocDemo>

          <DocDemo title="Modal disabled moving" link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/modal.tsx">
            <JimoButton
              onClick={() => {
                setNoMovingVisible(true);
              }}
              text="Try Modal No moving"
            />
            <DocBlock content="通过添加 `disableMoving` 属性关闭拖拽功能."></DocBlock>
            <MesonModal
              title={"DEMO modal"}
              visible={noMovingVisible}
              onClose={() => {
                setNoMovingVisible(false);
              }}
              disableMoving
              renderContent={() => {
                return (
                  <div>
                    <span
                      onClick={() => {
                        setNoMovingVisible(false);
                      }}
                    >
                      Close
                    </span>
                  </div>
                );
              }}
            />
          </DocDemo>

          <DocDemo title="Default configs">
            <DocBlock content={contentDefault} />
            <DocSnippet code={codeDefault} />
          </DocDemo>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;

let styleContainer = css``;

let styleBoxArea = css`
  padding: 20px;
`;

const styleLabel = css`
  width: 200px;
`;

let codeDefault = `
setMesonModalDefaultConfigs({
  disableBackdropClose: false,
  disableMoving: false,
  centerTitle: false,
  hideClose: false,
  cardClassName: undefined,
});
`;

let contentDefault = `
对于应用级别的默认配置, 可以通过 \`setMesonModalDefaultConfigs\` 进行统一控制.
`;
