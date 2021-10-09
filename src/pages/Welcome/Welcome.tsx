import { useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonSlide,
  IonSlides,
  IonToolbar,
} from "@ionic/react";
import { arrowForward } from "ionicons/icons";

import { authActions, useAppDispatch } from "states";

import "./Welcome.scss";

interface Props {}

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

export const Welcome: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const slider = useRef<any>();
  const [showSkip, setShowSkip] = useState<boolean>(true);

  const hideWelcomeScreen = () => dispatch(authActions.welcome(false));

  const handleSlideChange = async () => {
    const swiper = await slider.current.getSwiper();
    setShowSkip(!swiper.isEnd);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="welcome-screen">
        <IonToolbar>
          {showSkip && (
            <IonButtons slot="end">
              <IonButton onClick={hideWelcomeScreen}>Skip</IonButton>
            </IonButtons>
          )}
        </IonToolbar>

        <IonSlides ref={slider} pager={true} options={slideOpts} onIonSlideDidChange={handleSlideChange}>
          <IonSlide>
            <div className="slide">
              <img src="assets/icons/slide-1.png" />
              <h2>Welcome</h2>
              <p>
                The <b>PELCO1 Reminder App</b> is an app where you can view your bills, power interruption
                schedules and other PELCO1 announcements.
              </p>
            </div>
          </IonSlide>

          <IonSlide>
            <div className="slide">
              <img src="assets/icons/slide-2.png" />
              <h2>Monthly Bills</h2>
              <p>
                You can now view your <b>Monthly Bills</b> and be notified of your current due date and
                disconnection date at the ease of your hands.
              </p>
            </div>
          </IonSlide>

          <IonSlide>
            <div className="slide">
              <img src="assets/icons/slide-3.png" />
              <h2>Announcement and Schedules</h2>
              <p>
                View and be notified of <b>PELCO1 Official Announcement and Power Interruption Schedules</b>{" "}
                and plan ahead to avoid inconvenience.
              </p>
            </div>
          </IonSlide>

          <IonSlide>
            <div className="slide">
              <img src="assets/icons/slide-4.png" />
              <h2>Ready to Start?</h2>
              <IonButton fill="clear" onClick={hideWelcomeScreen}>
                Get Started! <IonIcon slot="end" icon={arrowForward}></IonIcon>
              </IonButton>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};
