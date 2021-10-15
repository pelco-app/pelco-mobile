import { useEffect } from "react";

import { setPersist } from "utils/storage";
import { useIsMounted } from "./useIsMounted";
import { useAppSelector } from "states";

export const usePersistentState = () => {
  const state = useAppSelector((state) => state);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!isMounted) {
      setPersist(state);
    }
  }, [state]);
};
