import { useCallback, useRef } from "react";
import { IonInput } from "@ionic/react";
import IMask from "imask";

export const MaskedInput: React.FC<any> = ({
  value,
  onChange,
  options,
  ...props
}: any) => {
  const maskRef = useRef<IMask.InputMask<any> | null>(null);
  const inputCallback = useCallback(async (input) => {
    if (!input) {
      return;
    }
    const nativeInput = await input.getInputElement();
    const mask = IMask(nativeInput, options)
      .on("accept", () => {
        onChange(mask.value);
      })
      .on("complete", () => {
        onChange(mask.value);
      });

    maskRef.current = mask;
  }, []);

  return <IonInput {...props} value={value} ref={inputCallback} />;
};
