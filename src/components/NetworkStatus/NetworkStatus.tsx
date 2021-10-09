import { useEffect, useState } from "react";

import { useNetworkStatus } from "utils/hooks";
import "./NetworkStatus.scss";

export const NetworkStatus: React.FC = () => {
  const networkStatus = useNetworkStatus();
  const [offline, setOffline] = useState<boolean>(false);
  const [delayer, setDelayer] = useState<any>();

  useEffect(() => {
    if (networkStatus.connected) {
      setDelayer(setTimeout(() => setOffline(false), 3000));
    } else {
      clearTimeout(delayer);
      setOffline(true);
    }
  }, [networkStatus.connected]);

  return (
    <>
      {offline && (
        <div className={networkStatus.connected ? "online" : "offline"}>
          <p>{networkStatus.connected ? "CONNECTED" : "NO NETWORK"}</p>
        </div>
      )}
    </>
  );
};
