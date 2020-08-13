import React from "react";
import ReactDOM from "react-dom";
import { canUseDom } from "./utils/event";

const containerAttributeName: string = "meson-modal-container";

let portalContainer: HTMLDivElement | null;

export default class Portal extends React.Component {
  el: HTMLDivElement | null = null;
  constructor(props: {}) {
    super(props);

    if (!canUseDom) return;

    portalContainer = document.querySelector<HTMLDivElement>(`div[${containerAttributeName}]`);

    if (!portalContainer) {
      portalContainer = document.createElement("div");
      portalContainer.setAttribute(containerAttributeName, "");
      document.body.appendChild(portalContainer);
    }

    this.el = document.createElement("div");
    portalContainer.appendChild(this.el);
  }

  componentWillUnmount() {
    if (portalContainer && this.el) {
      portalContainer.removeChild(this.el);
    }
  }

  render() {
    if (!canUseDom || !this.el) return null;
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
