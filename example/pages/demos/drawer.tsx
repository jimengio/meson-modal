import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonDrawer from "../../../src/drawer";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import { JimoButton } from "@jimengio/jimo-basics";

let DemoDrawer: FC<{}> = (props) => {
  let [visible, setVisible] = useState(false);
  let [customVisible, setCustomVisible] = useState(false);

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <div>
          <DocDemo title="Drawer" link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/drawer.tsx">
            <JimoButton
              onClick={() => {
                setVisible(true);
              }}
              text="Try Drawer"
            />

            <DocSnippet code={codeDrawer} />
          </DocDemo>

          <DocDemo title={"Drawer with custom header"} link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/drawer.tsx">
            <DocBlock content={contentCustomHeader} />
            <JimoButton
              onClick={() => {
                setCustomVisible(true);
              }}
              text="Drawer with custom header"
            />

            <DocSnippet code={codeCustomHeader} />
          </DocDemo>
        </div>
      </div>

      <MesonDrawer
        title={"DEMO drawer"}
        width={400}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        renderContent={() => {
          return (
            <div>
              SOMETHING
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

      <MesonDrawer
        title={"Custom header"}
        width={800}
        visible={customVisible}
        headerClassName={styleHeader}
        onClose={() => {
          setCustomVisible(false);
        }}
        renderContent={() => {
          return <div>NOTHING</div>;
        }}
      />
    </div>
  );
};

export default DemoDrawer;

let styleContainer = css``;

let styleBoxArea = css`
  padding: 20px;
`;

let styleHeader = css`
  background-color: rgb(28, 63, 118);
  color: white;
  height: 120px;
`;

let codeDrawer = `
let [visible, setVisible] = useState(false);

<MesonDrawer
  title={"DEMO drawer"}
  width={400}
  visible={visible}
  onClose={() => {
    setVisible(false);
  }}
  renderContent={() => {
    // return ...
  }}
/>
`;

let codeCustomHeader = `
<MesonDrawer
  title={"Custom header"}
  width={800}
  visible={customVisible}

  headerClassName={styleHeader}

 {/* ... */}
/>
`;

let contentCustomHeader = `
Drawer 的头部样式可以通过 \`headerClassName\` 进行定制.
`;
