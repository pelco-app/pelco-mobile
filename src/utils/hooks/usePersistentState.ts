import { useEffect } from "react";

import { getPersist, setPersist } from "utils/storage";
import { useIsMounted } from "./useIsMounted";
import { useAppDispatch, useAppSelector } from "states";

export const usePersistentState = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      getPersist().then((states) => states && dispatch({ type: "PERSIST", states }));
    } else {
      setPersist(state);
    }
  }, [state]);
};
