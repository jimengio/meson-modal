import React, { useRef, useEffect } from "react";
import { ReactNode, useState } from "react";
import MesonModal from "./modal";
import { rowParted, rowCenter, Space, column, expand, fullHeight, center, row } from "@jimengio/flex-styles";
import { JimoButton } from "@jimengio/jimo-basics";
import { css, cx } from "emotion";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";

let defaultButtonLocales = {
  cancel: "Cancel",
  confirm: "Confirm",
};

export let resetConfirmButtonLocales = (locales: { cancel: string; confirm: string }) => {
  defaultButtonLocales.cancel = locales.cancel;
  defaultButtonLocales.confirm = locales.confirm;
};

interface IConfirmOptions {
  type?: "warning" | "error";
  text: string;
  cancelText?: string;
  confirmText?: string;
  hideConfirmBtn?: boolean;
}

/**
 * 弹出 Modal 用于确认/取消
 * @param options
 */
export let useConfirmPop = (options?: IConfirmOptions) => {
  let [showModal, setShowModal] = useState(false);
  let resolveRef = useRef(null);
  let rejectRef = useRef(null);
  let promiseRef = useRef<Promise<boolean>>();
  let [confirmOptions, setConfirmOptions] = useState(options || ({ text: "Sure?" } as IConfirmOptions));

  let renderIcon = () => {
    switch (confirmOptions?.type) {
      case "error":
        return <JimoIcon name={EJimoIcon.crossEmbossed} className={cx(styleIcon, styleError)} />;
      case "warning":
      default:
        return <JimoIcon name={EJimoIcon.warnEmbossed} className={cx(styleIcon, styleWarning)} />;
    }
  };

  let ui = (
    <MesonModal
      title={null}
      visible={showModal}
      onClose={() => setShowModal(false)}
      disableBackdropClose={true}
      width={440}
      renderContent={() => {
        return (
          <div className={cx(column, expand, styleCard)}>
            <Space height={16} />
            <div className={cx(expand, center)}>
              <div className={cx(row, styleContent)}>
                {renderIcon()}
                <div className={expand}>{confirmOptions.text}</div>
              </div>
            </div>

            <Space height={16} />
            <div className={rowCenter}>
              <JimoButton
                canceling
                text={confirmOptions.cancelText || defaultButtonLocales.cancel}
                onClick={() => {
                  resolveRef.current(false);
                  setShowModal(false);
                }}
                data-action="cancel"
              />
              {confirmOptions.hideConfirmBtn ? null : (
                <>
                  <Space width={16} />
                  <JimoButton
                    text={confirmOptions.confirmText || defaultButtonLocales.confirm}
                    fillColor
                    onClick={() => {
                      resolveRef.current(true);
                      setShowModal(false);
                    }}
                    data-action="confirm"
                  />
                </>
              )}
            </div>
          </div>
        );
      }}
    />
  );

  let forConfirmation = (opts?: IConfirmOptions) => {
    if (opts) {
      setConfirmOptions({
        ...confirmOptions,
        type: opts.type,
        text: opts.text,
        confirmText: opts.confirmText,
        cancelText: opts.cancelText,
        hideConfirmBtn: opts.hideConfirmBtn,
      });
    }
    setShowModal(true);
    if (!showModal) {
      promiseRef.current = new Promise((resolve, reject) => {
        resolveRef.current = resolve;
        rejectRef.current = reject;
      });
    }
    return promiseRef.current;
  };

  return {
    ui,
    /** 等待用户操作进行确认, 需要使用 await */
    forConfirmation,
  };
};

/** DEPRECATING, 优先使用 useConfirmPop 统一使用方法 */
export let useConfirmModal = (options?: IConfirmOptions) => {
  let plugin = useConfirmPop(options);

  let ui = plugin.ui;
  let waitConfirmation = plugin.forConfirmation;

  return [ui, waitConfirmation] as [ReactNode, typeof waitConfirmation];
};

let styleCard = css`
  padding: 16px;
`;

let styleContent = css`
  font-size: 14px;
  line-height: 24px;
  color: hsl(0, 0%, 40%);
`;

let styleIcon = css`
  font-size: 20px;
  margin-right: 8px;
  border-radius: 10px;
`;

let styleError = css`
  color: hsla(357, 91%, 55%, 1);
`;

let styleWarning = css`
  color: hsla(36, 100%, 69%, 1);
`;
