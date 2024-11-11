import { useContext } from "react";
import styles from "./index.module.css";

import WebApp from "@twa-dev/sdk";
import { KEYS } from "../../constants";
import { LayoutContext } from "../../contexts/layout";
import { DevInfo } from "../dev-info";
import { LAYOUT_ACTION } from "../../contexts/layout/reducer";
import { Button } from "@radix-ui/themes";

const telegramFirstName = WebApp.initDataUnsafe.user?.first_name;
const displayName = telegramFirstName ? `${telegramFirstName}, you` : "You";

function CountClicker() {
  const {
    state: { actionButtonClicksCount },
    dispatch: layoutDispatch,
  } = useContext(LayoutContext);

  const updateCount = (count: number) => {
    WebApp.CloudStorage.setItem(KEYS.CLICK_COUNTER, count.toString());
    layoutDispatch({ type: LAYOUT_ACTION.SET_COUNT, payload: count });
  };
  const handleIncrementClick = () => updateCount(actionButtonClicksCount + 1);
  const handleResetClick = () => updateCount(0);

  return (
    <>
      <div className={styles.card}>
        <Button onClick={handleIncrementClick}>
          {`${displayName} clicked me ${actionButtonClicksCount} times`}
        </Button>
      </div>
      <div className={styles.card}>
        <Button onClick={handleResetClick}>Reset</Button>
      </div>
      <div className={styles.card}>
        <Button
          onClick={() =>
            WebApp.showAlert(
              `Hello World! Current count is ${actionButtonClicksCount}`
            )
          }
        >
          Show Alert
        </Button>
      </div>
      <div className={styles.card}>
        <DevInfo />
      </div>
    </>
  );
}

export default CountClicker;
