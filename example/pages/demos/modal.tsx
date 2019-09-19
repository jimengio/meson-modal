import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonModal from "../../../src/modal";
import SourceLink from "../source-link";

let DemoModal: FC<{}> = (props) => {
  let [visible, setVisible] = useState(false);
  let [noMovingVisible, setNoMovingVisible] = useState(false);

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <div>
          <button
            onClick={() => {
              setVisible(true);
            }}
          >
            Try Modal
          </button>

          <button
            onClick={() => {
              setNoMovingVisible(true);
            }}
          >
            Try Modal No moving
          </button>
        </div>
      </div>

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
      <div>
        <SourceLink fileName={"modal.tsx"} />
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
