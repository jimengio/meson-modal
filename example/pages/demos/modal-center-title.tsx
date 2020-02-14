import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonModal from "../../../src/modal";
import { DocDemo, DocBlock } from "@jimengio/doc-frame";
import { JimoButton } from "@jimengio/jimo-basics";

let DemoModalCenterTitle: FC<{}> = (props) => {
  let [centeredVisible, setCenteredVisible] = useState(false);

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <div>
          <DocDemo title="Modal with title centered" link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/modal.tsx">
            <DocBlock content={"通过添加 `centerTitle` 属性, 让标题居中."} />
            <JimoButton
              onClick={() => {
                setCenteredVisible(true);
              }}
              text="Center title"
            />

            <MesonModal
              title={"DEMO modal"}
              visible={centeredVisible}
              onClose={() => {
                setCenteredVisible(false);
              }}
              centerTitle
              disableMoving
              renderContent={() => {
                return (
                  <div>
                    <span
                      onClick={() => {
                        setCenteredVisible(false);
                      }}
                    >
                      Close
                    </span>
                  </div>
                );
              }}
            />
          </DocDemo>
        </div>
      </div>
    </div>
  );
};

export default DemoModalCenterTitle;

let styleContainer = css``;

let styleBoxArea = css`
  padding: 20px;
`;
