import React from "react";
import { IonSlides, IonSlide, IonContent, IonButton } from "@ionic/react";

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

interface Props {
  setShowWelcome: (state: boolean) => void;
}

const Welcome: React.FC<Props> = ({ setShowWelcome }) => (
  <IonContent>
    <IonSlides
      style={{
        height: "100vh",
        background: "red",
      }}
      pager={true}
      options={slideOpts}
    >
      <IonSlide>
        <h1>Slide 1</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 2</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 3</h1>
        <IonButton expand="block" onClick={() => setShowWelcome(false)}>
          Continue
        </IonButton>
      </IonSlide>
    </IonSlides>
  </IonContent>
);

export default Welcome;
