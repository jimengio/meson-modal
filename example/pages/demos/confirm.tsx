import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonModal from "../../../src/modal";
import { DocDemo, DocBlock, DocSnippet } from "@jimengio/doc-frame";
import { useConfirmModal } from "../../../src/confirm";
import { IconButton } from "@jimengio/jimo-basics";

let code = `
let [ui, waitConfirmation] = useConfirmModal();

let onClick = async () => {
  let result = await waitConfirmation({ title: "TODO", description: "TODO" });
  console.log("result", result);
}

return <div>
  <button onClick={onClick}>Check</button>
  {ui}
</div>
`;

let DemoConfirm: FC<{}> = (props) => {
  let [ui, waitConfirmation] = useConfirmModal();

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <DocSnippet code={code} />
        <div>
          <DocDemo title="Confirm" link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/confirm.tsx">
            <IconButton
              onClick={async () => {
                let result = await waitConfirmation({
                  title: "TODO2",
                  text: "DESC2",
                });
                console.log("result", result);
              }}
              text={"Confirm"}
            ></IconButton>
          </DocDemo>
        </div>
      </div>
      {ui}
    </div>
  );
};

export default DemoConfirm;

let styleContainer = css``;

let styleBoxArea = css`
  padding: 20px;
`;
