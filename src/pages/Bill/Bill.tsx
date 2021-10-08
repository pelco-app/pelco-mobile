import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Refresher, SkeletonList } from "components";
import { billActions } from "context";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useContext, AppContext } from "State";
import "./Bill.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Bill: React.FC<Props> = ({ match }) => {
  const { state, dispatch } = useContext(AppContext);
  const { bills } = state;

  const doRefresh = (refresher: any) => {
    dispatch(billActions.get(match.params.id, refresher.detail));
  };

  useEffect(() => dispatch(billActions.get(match.params.id)), [match.params.id]);

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle size="small">Bill {match.params.id}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bill-page">
        <Refresher onRefresh={doRefresh} />

        {bills.loading ? <SkeletonList count={10} /> : <p>{bills.show.id}</p>}
      </IonContent>
    </IonPage>
  );
};
