import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AppContext, useContext } from "State";
import { ExploreContainer } from "components";
import "./Dashboard.scss";

export const Dashboard: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer
          name={`Account number: ${state.auth.user?.accountNumber}`}
        />
      </IonContent>
    </IonPage>
  );
};
