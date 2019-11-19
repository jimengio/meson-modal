import React, { FC, useEffect, useState, ReactNode, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { css, cx } from "emotion";
import { rowParted, column } from "@jimengio/shared-utils";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";
import { useImmer } from "use-immer";
import { addEventHandler, removeEventHandler } from "./utils/event";

import Portal from "./portal";

let transitionDuration = 160;

let checkIfDomTreeContains = (a: HTMLElement, b: HTMLElement): boolean => {
  if (a === b) {
    return true;
  }
  if (b == null) {
    return false;
  }
  return checkIfDomTreeContains(a, b.parentElement);
};

let MesonModal: FC<{
  title?: string;
  visible: boolean;
  width?: number | string;
  onClose: () => void;
  renderContent: () => ReactNode;
  hideClose?: boolean;
  disableMoving?: boolean;
  disableBackdropClose?: boolean;
  /** put modal title at center */
  centerTitle?: boolean;
}> = (props) => {
  let backdropElement = useRef<HTMLDivElement>();
  let cardRef = useRef<HTMLDivElement>();

  // use CSS translate to move modals
  let [translation, immerTranslation] = useImmer({
    x: 0,
    y: 0,
  });

  let mousemoveListener = useRef<(event: MouseEvent) => void>();
  let mouseupListener = useRef<(event: MouseEvent) => void>();

  /** Methods */

  let onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.disableMoving) {
      return;
    }

    let anchorX = event.clientX;
    let anchorY = event.clientY;

    mousemoveListener.current = (event) => {
      let dx = event.clientX - anchorX;
      let dy = event.clientY - anchorY;

      anchorX = event.clientX;
      anchorY = event.clientY;

      immerTranslation((draft) => {
        draft.x = draft.x + dx;
        draft.y = draft.y + dy;
      });
    };

    // handle event and remove listeners after mouseup
    mouseupListener.current = (event) => {
      event.preventDefault();

      removeEventHandler(backdropElement.current, "mousemove", mousemoveListener.current);
      removeEventHandler(document, "mouseup", mouseupListener.current);
    };

    addEventHandler(backdropElement.current, "mousemove", mousemoveListener.current);
    addEventHandler(document, "mouseup", mouseupListener.current);
  };

  let onBackdropClick = (event) => {
    if (!props.disableBackdropClose) {
      let clickFromInside = checkIfDomTreeContains(cardRef.current, event.target);
      if (!clickFromInside) {
        props.onClose();
      }
    }
  };

  /** Effects */

  useEffect(() => {
    return () => {
      // in case events not cleared
      if (mousemoveListener.current) {
        document.removeEventListener("mousemove", mousemoveListener.current);
      }
      if (mouseupListener.current) {
        document.removeEventListener("mouseup", mousemoveListener.current);
      }
    };
  }, []);

  /** Renderers */

  const node = (
    <div className={styleAnimations}>
      <CSSTransition in={props.visible} unmountOnExit={true} classNames="backdrop" timeout={transitionDuration}>
        <div className={styleBackdrop} onClick={onBackdropClick} ref={backdropElement}>
          <div className={styleMoveContainer} style={{ transform: `translate(${translation.x}px, ${translation.y}px)` }}>
            <div className={cx(column, stylePopPage, "modal-card")} style={{ maxHeight: window.innerHeight - 80, width: props.width }} ref={cardRef}>
              {props.title ? (
                <div className={cx(rowParted, styleHeader, props.disableMoving ? null : styleMoving)} onMouseDown={onMouseDown}>
                  {props.centerTitle ? <span /> : null}
                  <span>{props.title}</span>
                  {props.hideClose ? null : (
                    <JimoIcon
                      name={EJimoIcon.slimCross}
                      className={styleIcon}
                      onClick={props.onClose}
                      onMouseEnter={(event) => {
                        event.stopPropagation();
                      }}
                    />
                  )}
                </div>
              ) : null}
              {props.renderContent()}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );

  return <Portal>{node}</Portal>;
};

export default MesonModal;

let styleAnimations = css`
  .backdrop-enter {
    opacity: 0;

    .modal-card {
      transform: scale(0.9);
    }
  }
  .backdrop-enter.backdrop-enter-active {
    opacity: 1;
    transition-duration: ${transitionDuration}ms;
    .modal-card {
      transform: scale(1);
      transition-duration: ${transitionDuration}ms;
    }
  }
  .backdrop-exit {
    opacity: 1;

    .modal-card {
      transform: scale(1);
    }
  }
  .backdrop-exit.backdrop-exit-active {
    opacity: 0;
    transition-duration: ${transitionDuration}ms;

    .modal-card {
      transform: scale(0.9);
      transition: ${transitionDuration}ms;
    }
  }
`;

let stylePopPage = css`
  background-color: white;
  min-width: 520px;
  min-height: 160px;
  border-radius: 2px;

  transform-origin: 50% -50%;
  will-change: transform;

  transition-timing-function: linear;
`;

// z-index = 1000 to simulate an antd modal
let styleBackdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 0%, 0.65);
  transition-timing-function: linear;
  z-index: 1000;

  display: flex;
`;

let styleHeader = css`
  padding: 0 24px;
  height: 56px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid hsl(0, 0%, 91%);
`;

let styleMoving = css`
  cursor: move;
  user-select: none;
`;

let styleIcon = css`
  color: #ccc;
  cursor: pointer;
  font-size: 20px;

  :hover {
    color: #aaf;
  }
`;

/** an extra layer since both move and transition write to `transform` property, would conflict */
let styleMoveContainer = css`
  margin: auto;
`;
