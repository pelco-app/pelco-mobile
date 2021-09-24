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
