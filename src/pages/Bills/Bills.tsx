import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { ExploreContainer } from "components";
import { RouteComponentProps } from "react-router-dom";
import "./Bills.scss";

interface Props extends RouteComponentProps<{ id: string }> {}

export const Bills: React.FC<Props> = ({ match }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Bills</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ExploreContainer name={match.params.id ? `Bill id: ${match.params.id}` : `Bills page`} />
      </IonContent>
    </IonPage>
  );
};
