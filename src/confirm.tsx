import React, { useRef, useEffect } from "react";
import { ReactNode, useState } from "react";
import MesonModal from "./modal";
import { rowParted, rowCenter, Space, column, expand, fullHeight } from "@jimengio/flex-styles";
import { JimoButton } from "@jimengio/jimo-basics";
import { css, cx } from "emotion";

let defaultButtonLocales = {
  cancel: "Cancel",
  confirm: "Confirm",
};

export let resetConfirmButtonLocales = (locales: { cancel: string; confirm: string }) => {
  defaultButtonLocales.cancel = locales.cancel;
  defaultButtonLocales.confirm = locales.confirm;
};

interface IConfirmOptions {
  title?: string;
  text: string;
  cancelText?: string;
  confirmText?: string;
}

export let useConfirmModal = (options?: IConfirmOptions) => {
  let [showModal, setShowModal] = useState(false);
  let resolveRef = useRef(null);
  let rejectRef = useRef(null);
  let promiseRef = useRef<Promise<boolean>>();
  let [confirmOptions, setConfirmOptions] = useState(options || { text: "Sure?" });

  let ui = (
    <MesonModal
      title={null}
      visible={showModal}
      onClose={() => setShowModal(false)}
      disableBackdropClose={true}
      width={400}
      renderContent={() => {
        return (
          <div className={cx(column, expand, styleCard)}>
            <Space height={8} />
            {confirmOptions.title ? (
              <>
                <div className={styleTitle}>{confirmOptions.title}</div>
                <Space height={8} />
              </>
            ) : null}
            <div className={cx(expand, styleDesc)}>{confirmOptions.text}</div>
            <Space height={16} />
            <div className={rowParted}>
              <span />
              <div className={rowCenter}>
                <JimoButton
                  text={confirmOptions.cancelText || defaultButtonLocales.cancel}
                  onClick={() => {
                    resolveRef.current(false);
                    setShowModal(false);
                  }}
                />
                <Space width={8} />
                <JimoButton
                  text={confirmOptions.cancelText || defaultButtonLocales.confirm}
                  fillColor
                  onClick={() => {
                    resolveRef.current(true);
                    setShowModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    />
  );

  let waitConfirmation = (opts?: IConfirmOptions) => {
    if (opts) {
      setConfirmOptions({ ...confirmOptions, title: opts.title, text: opts.text, confirmText: opts.confirmText, cancelText: opts.cancelText });
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

  return [ui, waitConfirmation] as [ReactNode, typeof waitConfirmation];
};

let styleCard = css`
  padding: 16px;
`;

let styleTitle = css`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
`;

let styleDesc = css`
  font-size: 14px;
  line-height: 24px;
  color: hsl(0, 0%, 40%);
`;
