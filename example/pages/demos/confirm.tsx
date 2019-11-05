import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonModal from "../../../src/modal";
import { DocDemo, DocBlock } from "@jimengio/doc-frame";
import { useConfirmModal } from "../../../src/confirm";
import { IconButton } from "@jimengio/jimo-basics";

let DemoConfirm: FC<{}> = (props) => {
  let [ui, waitConfirmation] = useConfirmModal();

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <DocBlock>{`
Example:

\`\`\`tsx
let [ui, waitConfirmation] = useConfirmModal();

let onClick = () => {
  let result = await waitConfirmation({ title: "TODO", description: "TODO" });
  console.log("result", result);
}

<div>
  {ui}
</div>
\`\`\`

`}</DocBlock>
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
