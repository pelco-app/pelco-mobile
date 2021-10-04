import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { ExploreContainer } from "components";
import "./Announcements.scss";

export const Announcements: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Announcements</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer name="Announcements page" />
      </IonContent>
    </IonPage>
  );
};
