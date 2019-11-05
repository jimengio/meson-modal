## Meson Modal

> Modal components for Meson form and other cases... Customized for JimengIO projects.

### Usage

![](https://img.shields.io/npm/v/@jimengio/meson-modal.svg?style=flat-square)

```bash
yarn add @jimengio/meson-modal
```

- Modal

Demo http://fe.jimu.io/meson-modal/#/modal

```tsx
import { MesonModal } from "@jimengio/meson-modal";

<MesonModal
  title={"DEMO modal"}
  visible={noMovingVisible}
  onClose={() => {
    setNoMovingVisible(false);
  }}
  disableMoving
  renderContent={() => {
    return (
      <div>
        <span
          onClick={() => {
            setNoMovingVisible(false);
          }}
        >
          Close
        </span>
      </div>
    );
  }}
/>;
```

- Drawer

Demo http://fe.jimu.io/meson-modal/#/drawer

```tsx
import { MesonDrawer } from "jimengio/meson-drawer";

<MesonDrawer
  title={"Custom header"}
  width={800}
  visible={customVisible}
  headerClassName={styleHeader}
  onClose={() => {
    setCustomVisible(false);
  }}
  renderContent={() => {
    return <div>NOTHING</div>;
  }}
/>;
```

- Confirm API

```tsx
import { useConfirmModal } from "jimengio/meson-drawer";

let [ui, waitConfirmation] = useConfirmModal({ title: "title", description: "desc" });

let onClick = () => {
  let result = await waitConfirmation({description: 'custom description});
  console.log("result", result);
};

<div>{ui}</div>;
```

### Workflow

https://github.com/jimengio/ts-workflow

### License

MIT
