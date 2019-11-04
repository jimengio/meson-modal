import React, { useRef } from "react";
import { ReactNode, useState } from "react";
import MesonModal from "./modal";
import { rowParted, rowCenter, Space } from "@jimengio/flex-styles";
import { IconButton } from "@jimengio/jimo-basics";

interface IConfirmOptions {
  title?: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
}

export let useConfirmModal = (options: IConfirmOptions): [ReactNode, () => Promise<boolean>] => {
  let [showModal, setShowModal] = useState(false);
  let promiseRef = useRef<Promise<boolean>>();
  if (promiseRef.current == null) {
    promiseRef.current = new Promise((resolve, reject) => {});
  }

  let ui = (
    <MesonModal
      title={options.title}
      visible={showModal}
      onClose={() => setShowModal(false)}
      renderContent={() => {
        return (
          <div>
            <div>{options.description}</div>
            <div className={rowParted}>
              <span />
              <div className={rowCenter}>
                <IconButton text={options.cancelText} onClick={() => {}} />
                <Space width={8} />
                <IconButton text={options.cancelText} fillColor onClick={() => {}} />
              </div>
            </div>
          </div>
        );
      }}
    />
  );

  let waitConfirmation = async () => {
    return false;
  };

  return [ui, waitConfirmation];
};
