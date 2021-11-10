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
import { announcementActions, useAppDispatch, useAppSelector } from "states";

import "./Announcement.scss";

interface Props extends RouteComponentProps<any> {}

export const Announcement: React.FC<Props> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { announcements } = useAppSelector((state) => state);

  const doRefresh = (refresher: CustomEvent<RefresherEventDetail>) => {
    dispatch(announcementActions.get(match.params.id)).then(() => refresher.detail.complete());
  };

  useEffect((): any => dispatch(announcementActions.get(match.params.id)), [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/announcements" routerDirection="back">
              <IonIcon icon={chevronBackOutline}></IonIcon> Back
            </IonButton>
          </IonButtons>
          <IonTitle>Announcement Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="announcement-page">
        <Refresher onRefresh={doRefresh} />

        {!announcements.item.id && !announcements.loading ? (
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Failed to load. Please try again.</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                {announcements.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  `${announcements.item.title}`
                )}
              </IonCardTitle>
              <IonCardSubtitle>
                {announcements.loading ? (
                  <IonSkeletonText animated style={{ width: "35%" }} />
                ) : (
                  `${announcements.item.description}`
                )}
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent className="card-content">
              <IonItem lines="none">
                {announcements.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: announcements.item.content }}></div>
                )}
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};
