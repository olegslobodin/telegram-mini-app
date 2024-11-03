import { useContext } from "react";
import styles from "./index.module.css";

import WebApp from "@twa-dev/sdk";
import { KEYS } from "../../constants";
import { LayoutContext } from "../../contexts/layout";
import { DevInfo } from "../dev-info";
import { LAYOUT_ACTION } from "../../contexts/layout/reducer";

const firstName = WebApp.initDataUnsafe.user?.first_name;

function CountClicker() {
  const {
    state: { count },
    dispatch: layoutDispatch,
  } = useContext(LayoutContext);

  const updateCount = (count: number) => {
    WebApp.CloudStorage.setItem(KEYS.CLICK_COUNTER, count.toString());
    layoutDispatch({ type: LAYOUT_ACTION.SET_COUNT, payload: count });
  };
  const handleIncrementClick = () => updateCount(count + 1);
  const handleResetClick = () => updateCount(0);

  return (
    <>
      <div className={styles.card}>
        <button onClick={handleIncrementClick}>
          {firstName ? `${firstName}, you` : "You"} clicked me {count} times
        </button>
      </div>
      <div className={styles.card}>
        <button onClick={handleResetClick}>Reset</button>
      </div>
      <div className={styles.card}>
        <button
          onClick={() =>
            WebApp.showAlert(`Hello World! Current count is ${count}`)
          }
        >
          Show Alert
        </button>
      </div>
      <div className={styles.card}>
        <DevInfo />
      </div>
    </>
  );
}

export default CountClicker;
