import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonDrawer from "../../../src/drawer";
import { DocDemo } from "@jimengio/doc-frame";

let DemoDrawer: FC<{}> = (props) => {
  let [visible, setVisible] = useState(false);
  let [customVisible, setCustomVisible] = useState(false);

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <div>
          <DocDemo title="Drawer" link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/drawer.tsx">
            <button
              onClick={() => {
                setVisible(true);
              }}
            >
              Try Drawer
            </button>
          </DocDemo>

          <DocDemo title={"Drawer with custom header"} link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/drawer.tsx">
            <button
              onClick={() => {
                setCustomVisible(true);
              }}
            >
              Drawer with custom header
            </button>
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
