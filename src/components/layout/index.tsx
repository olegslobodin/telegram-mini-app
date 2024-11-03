import { useEffect, useState, ReactNode, useContext } from "react";
import reactLogo from "../../../src/react.svg";
import styles from "./index.module.css";

import WebApp from "@twa-dev/sdk";
import classNames from "classnames";
import { KEYS } from "../../constants";
import { tryGetItem } from "../../utils";
import { LayoutContext } from "../../contexts/layout";
import { LAYOUT_ACTION } from "../../contexts/layout/reducer";
import { DevInfo } from "../dev-info";

interface Props {
  children?: ReactNode;
}

function Layout({ children }: Props) {
  const {
    state: { count, isLoading },
    dispatch: layoutDispatch,
  } = useContext(LayoutContext);
  const [isLogoAnimated, setIsLogoAnimated] = useState(true);

  useEffect(() => {
    const loadSavedCounter = async () => {
      const { error, result } = await tryGetItem(KEYS.CLICK_COUNTER);
      let newCount = count;
      if (error) {
        WebApp.showAlert(error);
      } else if (result) {
        newCount = Number(result);
      }

      layoutDispatch({
        type: LAYOUT_ACTION.COUNTER_LOADING_FINISHED,
        payload: newCount,
      });
    };

    loadSavedCounter();
  }, [count, layoutDispatch]);

  useEffect(() => {
    if (isLogoAnimated && !isLoading) {
      setTimeout(() => {
        setIsLogoAnimated(false);
      }, 500 + Math.floor(Math.random() * 3000));
    }
  }, [isLogoAnimated, isLoading]);

  return (
    <>
      <div>
        <img
          onClick={() => setIsLogoAnimated(true)}
          src={reactLogo}
          className={classNames(styles.logo, {
            [styles.animated]: isLogoAnimated,
            [styles.reversed]: count % 2 == 1,
          })}
          alt="React logo"
        />
      </div>

      {isLoading ? (
        <div className={styles.card}>
          <div>Loading your data...</div>
          <DevInfo />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default Layout;
