import React, { FC, useState } from "react";
import { css } from "emotion";
import { DocDemo, DocBlock, DocSnippet } from "@jimengio/doc-frame";
import { resetConfirmButtonLocales, useConfirmPop } from "../../../src/confirm";
import { JimoButton } from "@jimengio/jimo-basics";
import { Space } from "@jimengio/flex-styles";

let code = `
let confirmPlugin = useConformPop();

let onClick = async () => {
  let result = await confirmPlugin.forConfirmation({
    text: "节点可能包含子节点, 包含子元素, 删除节点会一并删除所有内容.",
  });
  console.log("result", result);
}

return <div>
  <button onClick={onClick}>Confirm</button>
  {confirmPlugin.ui}
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
  let confirmPlugin = useConfirmPop();

  let [result, setResult] = useState(null);

  return (
    <div className={styleContainer}>
      <div className={styleBoxArea}>
        <div>
          <DocDemo title="Confirm" link="https://github.com/jimengio/meson-modal/blob/master/example/pages/demos/confirm.tsx">
            <JimoButton
              onClick={async () => {
                setResult(null);
                let result = await confirmPlugin.forConfirmation({
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
                let result = await confirmPlugin.forConfirmation({
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
                let result = await confirmPlugin.forConfirmation({
                  type: "error",
                  text: "节点可能包含子节点, 包含子元素, 删除节点会一并删除所有内容.",
                });
                console.log("result", result);
                setResult(result);
              }}
              text={"Error to confirm"}
            ></JimoButton>

            <DocSnippet code={codeError} />
          </DocDemo>

          <DocDemo title="Locales">
            <JimoButton
              onClick={async () => {
                setResult(null);
                resetConfirmButtonLocales({
                  cancel: "取消",
                  confirm: "确认",
                });
                let result = await confirmPlugin.forConfirmation({
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

          <DocDemo title="Only close btn">
            <JimoButton
              onClick={async () => {
                setResult(null);
                resetConfirmButtonLocales({
                  cancel: "取消",
                  confirm: "确认",
                });
                let result = await confirmPlugin.forConfirmation({
                  text: "特殊情况下，隐藏确认按钮。",
                  hideConfirmBtn: true,
                });
                setResult(result);
              }}
              text={"Warning"}
            ></JimoButton>
            <Space width={8} />
            <DocSnippet code={codeOnlyCloseBtn} />
          </DocDemo>
        </div>
      </div>
      {confirmPlugin.ui}
    </div>
  );
};

export default DemoConfirm;

let styleContainer = css``;

let styleBoxArea = css`
  padding: 20px;
`;

let codeError = `
let result = await waitConfirmation({
  type: "error",
  text: "节点可能包含子节点, 包含子元素, 删除节点会一并删除所有内容.",
});
console.log("result", result);
`;

let codeOnlyCloseBtn = `
let result = await waitConfirmation({
  text: "特殊情况下，隐藏确认按钮。",
  hideConfirmBtn: true,
});
`;
