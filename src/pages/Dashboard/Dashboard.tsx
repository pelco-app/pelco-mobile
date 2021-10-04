import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { AppContext, useContext } from "State";
import { useNotifications } from "utils/hooks";
import "./Dashboard.scss";

export const Dashboard: React.FC = () => {
  const { state } = useContext(AppContext);
  const { notify } = useNotifications();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton
          expand="block"
          onClick={() => {
            notify({
              id: 1,
              title: "Monthly bill is out!",
              body: `Your monthly bill is now out. Tap here to view.`,
              summaryText: "Bill",
              extra: {
                type: "bill",
              },
            });
          }}
        >
          Send bill notification
        </IonButton>

        <IonButton
          expand="block"
          onClick={() => {
            notify({
              id: 2,
              title: "Announcement!",
              body: `We have a new announcement. Tap here to view.`,
              summaryText: "Announcement",
              extra: {
                type: "announcement",
              },
            });
          }}
        >
          Send announcement notification
        </IonButton>

        <IonButton
          expand="block"
          onClick={() => {
            notify({
              id: 3,
              title: "Scheduled Power Interruption!",
              body: `There is a scheduled power interruption. Tap here to view.`,
              summaryText: "Schedule",
              extra: {
                type: "schedule",
              },
            });
          }}
        >
          Send schedule notification
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
