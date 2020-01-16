interface IModalConfigs {
  disableBackdropClose?: boolean;
  disableMoving?: boolean;
  hideClose?: boolean;
  centerTitle?: boolean;
  cardClassName?: string;
}

export let defaultModalConfigs: IModalConfigs = {
  disableBackdropClose: false,
  disableMoving: false,
  hideClose: false,
  centerTitle: false,
  cardClassName: undefined,
};

export let setMesonModalDefaultConfigs = (options: IModalConfigs) => {
  Object.assign(defaultModalConfigs, options);
};
