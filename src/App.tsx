import { useEffect, useState } from "react";
import reactLogo from "../public/react.svg";
import "./App.css";

import WebApp from "@twa-dev/sdk";
import { FEATURES, KEYS } from "./constants";
import { tryGetItem } from "./utils";
import classNames from "classnames";

const isCloudStorageSupported = WebApp.isVersionAtLeast(FEATURES.CLOUD_STORAGE);
const isShowAlertSupported = WebApp.isVersionAtLeast(FEATURES.SHOW_ALERT);
const firstName = WebApp.initDataUnsafe.user?.first_name;

const showAlert = (message: string) => {
  if (isShowAlertSupported) {
    WebApp.showAlert(message);
  } else {
    console.log(message);
  }
};

function App() {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogoAnimated, setIsLogoAnimated] = useState(true);

  const updateCount = (count: number) => {
    if (isCloudStorageSupported) {
      WebApp.CloudStorage.setItem(KEYS.CLICK_COUNTER, count.toString());
    }
    setCount(count);
  };
  const handleIncrementClick = () => updateCount(count + 1);
  const handleResetClick = () => updateCount(0);

  const loadSavedCounter = async () => {
    if (!isCloudStorageSupported) {
      setIsLoaded(true);

      return;
    }

    const { error, result } = await tryGetItem(KEYS.CLICK_COUNTER);
    if (error) {
      showAlert(error);
    } else if (result) {
      setCount(Number(result));
    }

    setIsLoaded(true);
  };

  useEffect(() => {
    loadSavedCounter();
  }, []);

  useEffect(() => {
    if (isLogoAnimated && isLoaded) {
      setTimeout(() => {
        setIsLogoAnimated(false);
      }, 500 + Math.floor(Math.random() * 3000));
    }
  }, [isLogoAnimated, isLoaded]);

  const devInfo = (
    <>
      <div>API version: {WebApp.version}</div>
      <div>Env: {process.env.NODE_ENV}</div>
    </>
  );

  return (
    <>
      <div>
        <img
          onClick={() => setIsLogoAnimated(true)}
          src={reactLogo}
          className={classNames("logo", {
            animated: isLogoAnimated,
            reversed: count % 2 == 1,
          })}
          alt="React logo"
        />
      </div>

      {isLoaded ? (
        <>
          <div className="card">
            <button onClick={handleIncrementClick}>
              {firstName ? `${firstName}, you` : "You"} clicked me {count} times
            </button>
          </div>
          <div className="card">
            <button onClick={handleResetClick}>Reset</button>
          </div>
          <div className="card">
            <button
              onClick={() =>
                showAlert(`Hello World! Current count is ${count}`)
              }
            >
              Show Alert
            </button>
          </div>
          <div className="card">{devInfo}</div>
        </>
      ) : (
        <div className="card">
          <div>Loading your data...</div>
          {devInfo}
        </div>
      )}
    </>
  );
}

export default App;
