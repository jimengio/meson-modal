import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonModal from "../../../src/modal";
import { DocDemo, DocBlock, DocSnippet } from "@jimengio/doc-frame";
import { useConfirmModal } from "../../../src/confirm";
import { JimoButton } from "@jimengio/jimo-basics";
import { Space } from "@jimengio/flex-styles";

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

  let [result, setResult] = useState(null);

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <div>
          <DocDemo title="Confirm" link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/confirm.tsx">
            <JimoButton
              onClick={async () => {
                setResult(null);
                let result = await waitConfirmation({
                  title: "确定要删除节点?",
                  text: "节点可能包含子节点, 包含子元素, 删除节点会一并删除所有内容.",
                });
                console.log("result", result);
                setResult(result);
              }}
              text={"Confirm"}
            ></JimoButton>
            <Space width={8} />
            <span>Result: {result != null ? JSON.stringify(result) : "-"}</span>
            <DocSnippet code={code} />
          </DocDemo>

          <DocDemo title="No title">
            <JimoButton
              onClick={async () => {
                setResult(null);
                let result = await waitConfirmation({
                  text: "节点可能包含子节点, 包含子元素, 删除节点会一并删除所有内容.",
                });
                console.log("result", result);
                setResult(result);
              }}
              text={"Confirm"}
            ></JimoButton>
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
