import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ExploreContainer } from "components";
import "./Bills.scss";

export const Bills: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bills</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Bills</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Bills page" />
      </IonContent>
    </IonPage>
  );
};
