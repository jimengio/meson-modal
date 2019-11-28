import React, { FC, useState } from "react";
import { css } from "emotion";
import MesonModal from "../../../src/modal";
import { DocDemo, DocBlock, DocSnippet } from "@jimengio/doc-frame";
import { useConfirmModal, resetConfirmButtonLocales } from "../../../src/confirm";
import { JimoButton } from "@jimengio/jimo-basics";
import { Space } from "@jimengio/flex-styles";

let code = `
let [ui, waitConfirmation] = useConfirmModal();

let onClick = async () => {
  let result = await waitConfirmation({ type: "warning", description: "TODO" });
  console.log("result", result);
}

return <div>
  <button onClick={onClick}>Check</button>
  {ui}
</div>
`;

let codeLocale = `
import { resetConfirmButtonLocales } from "@jimengio/meson-modal";

resetConfirmButtonLocales({
  cancel: "取消",
  confirm: "确认",
});
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

            <JimoButton
              onClick={async () => {
                setResult(null);
                let result = await waitConfirmation({
                  text: "很短的警告.",
                });
                console.log("result", result);
                setResult(result);
              }}
              text={"Short Warning"}
            ></JimoButton>
          </DocDemo>

          <DocDemo title="Error">
            <JimoButton
              onClick={async () => {
                setResult(null);
                let result = await waitConfirmation({
                  type: "error",
                  text: "节点可能包含子节点, 包含子元素, 删除节点会一并删除所有内容.",
                });
                console.log("result", result);
                setResult(result);
              }}
              text={"Error to confirm"}
            ></JimoButton>
          </DocDemo>

          <DocDemo title="Locales">
            <JimoButton
              onClick={async () => {
                setResult(null);
                resetConfirmButtonLocales({
                  cancel: "取消",
                  confirm: "确认",
                });
                let result = await waitConfirmation({
                  text: "节点可能包含子节点, 包含子元素, 删除节点会一并删除所有内容.",
                });
                console.log("result", result);
                setResult(result);
              }}
              text={"Confirm"}
            ></JimoButton>
            <Space width={8} />
            <span>Result: {result != null ? JSON.stringify(result) : "-"}</span>
            <DocSnippet code={codeLocale} />
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
