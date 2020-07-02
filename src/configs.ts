interface IModalConfigs {
  disableBackdropClose?: boolean;
  disableMoving?: boolean;
  hideClose?: boolean;
  centerTitle?: boolean;
}

export let defaultModalConfigs: IModalConfigs = {
  disableBackdropClose: false,
  disableMoving: false,
  hideClose: false,
  centerTitle: false,
};

export let setMesonModalDefaultConfigs = (options: IModalConfigs) => {
  Object.assign(defaultModalConfigs, options);
};
