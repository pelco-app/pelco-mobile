import { useEffect } from "react";
import { useIonToast } from "@ionic/react";
import { useAppSelector } from "states";

const toastMessage = (message: string, dismiss: () => void) => ({
  duration: 3000,
  buttons: [{ text: "Hide", handler: () => dismiss() }],
  message,
  color: "dark",
});

export const useMessages = () => {
  const { messages } = useAppSelector((state) => state);
  const [presentToast, dismissToast] = useIonToast();

  useEffect(() => {
    const { success, error } = messages;

    dismissToast();

    if (success) {
      presentToast(toastMessage(success, dismissToast));
    } else if (error) {
      presentToast(toastMessage(error, dismissToast));
    }
  }, [messages]);
};
