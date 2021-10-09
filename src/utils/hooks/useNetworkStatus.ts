import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export const useNetworkStatus = () => {
  const [status, setStatus] = useState<any>({ connected: true });

  useEffect(() => {
    const subscribNetworkStatus = async () => {
      const status = await Network.getStatus();
      setStatus(status);
      Network.addListener("networkStatusChange", (status) => setStatus(status));
    };

    subscribNetworkStatus();

    return (): any => Network.removeAllListeners();
  }, []);

  return status;
};
