import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonModal from "../../../src/modal";
import { DocDemo, DocBlock, DocSnippet } from "@jimengio/doc-frame";
import { JimoButton } from "@jimengio/jimo-basics";
import { expand } from "@jimengio/flex-styles";

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
  let [showLongModal, setShowLongModal] = useState(false);

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <div>
          <DocDemo title="Modal" link={"https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/modal.tsx"}>
            <DocBlock content={codeModal} />
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

          <DocDemo title="Modal with long content">
            <JimoButton
              onClick={() => {
                setShowLongModal(true);
              }}
              text="Long modal content"
            />
            <DocBlock content={contentLongModal} />
            <MesonModal
              title={"Long Modal"}
              visible={showLongModal}
              onClose={() => {
                setShowLongModal(false);
              }}
              renderContent={() => {
                return (
                  <>
                    <div className={expand}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => {
                        return <div className={styleLongContent}>{idx}</div>;
                      })}
                    </div>
                    <span
                      onClick={() => {
                        setShowLongModal(false);
                      }}
                      style={{ padding: 20 }}
                    >
                      Close
                    </span>
                  </>
                );
              }}
            />
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

let codeModal = `
相比 antd, 这个 Modal 组件提供了拖拽移动的功能, 另外在动画还有样式方面出于性能考虑做了优化.
Modal 的 body 部分做得很简单, 方便定制样式.
`;

let styleLongContent = css`
  height: 200px;
  background-color: #aaa;
  margin: 20px;
`;

let contentLongModal = `
Modal 的 body 设置了 Flexbox column 的样式, 以及设定了滚动区域. 内部元素可以借助 Flexbox 相关属性进行布局, 内容长度过大时, 需要专门控制滚动条.
`;
