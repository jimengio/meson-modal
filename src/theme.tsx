import { css } from "emotion";

let emptyStyle = css``;

/** 全局主题配置入口, 通过 emotion 方式修改, 基于 mutable reference */
export let GlobalThemeVariables = {
  modalCard: emptyStyle,
  modalHeader: emptyStyle,
  drawerCard: emptyStyle,
  drawerHeader: emptyStyle,
  closeIcon: emptyStyle,
};

export let attachModalThemeVariables = (customVariables: Partial<typeof GlobalThemeVariables>): void => {
  Object.assign(GlobalThemeVariables, customVariables);
};
