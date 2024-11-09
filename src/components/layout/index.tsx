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
import UserInfo from "../auth/user-info";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  children?: ReactNode;
}

function Layout({ children }: Props) {
  const {
    state: { actionButtonClicksCount, isActionCounterLoading },
    dispatch: layoutDispatch,
  } = useContext(LayoutContext);

  const [isLogoAnimated, setIsLogoAnimated] = useState(true);

  const {
    isAuthenticated: isAuth0Authenticated,
    isLoading: isAuthLoading,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (isAuthLoading || !isAuth0Authenticated) {
      return;
    }

    const setAccessTokenAsync = async () => {
      try {
        layoutDispatch({
          type: LAYOUT_ACTION.AUTH_TOKEN_LOAD_START,
        });

        const token = await getAccessTokenSilently();

        layoutDispatch({
          type: LAYOUT_ACTION.AUTH_TOKEN_LOAD_SUCCESS,
          payload: token,
        });
      } catch (error) {
        console.error("Error getting token:", error);
        layoutDispatch({
          type: LAYOUT_ACTION.AUTH_TOKEN_LOAD_ERROR,
        });
      }
    };

    setAccessTokenAsync();
  }, [isAuth0Authenticated, isAuthLoading]);

  useEffect(() => {
    const loadSavedCounter = async () => {
      const { error, result } = await tryGetItem(KEYS.CLICK_COUNTER);
      let newCount = actionButtonClicksCount;
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
  }, [actionButtonClicksCount, layoutDispatch]);

  useEffect(() => {
    if (isLogoAnimated && !isActionCounterLoading) {
      setTimeout(() => {
        setIsLogoAnimated(false);
      }, 500 + Math.floor(Math.random() * 3000));
    }
  }, [isLogoAnimated, isActionCounterLoading]);

  return (
    <>
      <UserInfo />

      <div>
        <img
          onClick={() => setIsLogoAnimated(true)}
          src={reactLogo}
          className={classNames(styles.logo, {
            [styles.animated]: isLogoAnimated,
            [styles.reversed]: actionButtonClicksCount % 2 == 1,
          })}
          alt="React logo"
        />
      </div>

      {isActionCounterLoading ? (
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
