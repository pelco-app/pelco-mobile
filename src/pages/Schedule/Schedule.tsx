import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RefresherEventDetail } from "@ionic/core";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

import { Refresher } from "components";
import { scheduleActions, useAppDispatch, useAppSelector } from "states";

import "./Schedule.scss";

interface Props extends RouteComponentProps<any> {}

export const Schedule: React.FC<Props> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { schedules } = useAppSelector((state) => state);

  const doRefresh = (refresher: CustomEvent<RefresherEventDetail>) => {
    dispatch(scheduleActions.get(match.params.id)).then(() => refresher.detail.complete());
  };

  useEffect((): any => dispatch(scheduleActions.get(match.params.id)), [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/schedules" routerDirection="back">
              <IonIcon icon={chevronBackOutline}></IonIcon> Back
            </IonButton>
          </IonButtons>
          <IonTitle>Schedule Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="schedule-page">
        <Refresher onRefresh={doRefresh} />

        {!schedules.item.id && !schedules.loading ? (
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Failed to load. Please try again.</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                {schedules.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  `${schedules.item.title}`
                )}
              </IonCardTitle>
              <IonCardSubtitle>
                {schedules.loading ? (
                  <IonSkeletonText animated style={{ width: "35%" }} />
                ) : (
                  `${schedules.item.description}`
                )}
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent className="card-content">
              <IonItem>
                {schedules.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  <p>Time: {schedules.item.datePeriod}</p>
                )}
              </IonItem>
              <IonItem lines="none">
                {schedules.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: schedules.item.content }}></div>
                )}
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};
