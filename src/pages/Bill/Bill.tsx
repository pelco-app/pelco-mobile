import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RefresherEventDetail } from "@ionic/core";
import {
  IonBadge,
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
import { billActions, useAppDispatch, useAppSelector } from "states";
import { peso } from "utils/helpers";

import "./Bill.scss";

interface Props extends RouteComponentProps<any> {}

export const Bill: React.FC<Props> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { bills } = useAppSelector((state) => state);

  const doRefresh = (refresher: CustomEvent<RefresherEventDetail>) => {
    dispatch(billActions.get(match.params.id)).then(() => refresher.detail.complete());
  };

  const getStatusBadge = (status: string): JSX.Element => {
    let badgeClassName = "";

    switch (status.toLowerCase()) {
      case "paid":
        badgeClassName = "success";
        break;
      case "unpaid":
        badgeClassName = "warning";
        break;
      case "due":
        badgeClassName = "danger";
        break;
    }

    return (
      <IonBadge color={badgeClassName} className="status">
        {status}
      </IonBadge>
    );
  };

  useEffect((): any => dispatch(billActions.get(match.params.id)), [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/bills" routerDirection="back">
              <IonIcon icon={chevronBackOutline}></IonIcon> Back
            </IonButton>
          </IonButtons>
          <IonTitle>Bill Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bill-page">
        <Refresher onRefresh={doRefresh} />

        {!bills.item.id && !bills.loading ? (
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Failed to load. Please try again.</IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardHeader>
              {!bills.loading && getStatusBadge(bills.item.status)}
              <IonCardSubtitle>
                {bills.loading ? (
                  <IonSkeletonText animated style={{ width: "35%" }} />
                ) : (
                  `${bills.item.billingMonth} ${bills.item.billingYear}`
                )}
              </IonCardSubtitle>
              <IonCardTitle>
                {bills.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  `Amount Due: ${peso(bills.item.totalAmountDue)}`
                )}
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent className="card-content">
              <IonItem>
                {bills.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  <p>Current Charges: {peso(bills.item.currentCharges)}</p>
                )}
              </IonItem>
              <IonItem>
                {bills.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  <p>Previous Balance: {peso(bills.item.previousBalance)}</p>
                )}
              </IonItem>
              <IonItem>
                {bills.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  <p>Advance Payment: {peso(bills.item.advancePayment)}</p>
                )}
              </IonItem>
              <IonItem>
                {bills.loading ? (
                  <IonSkeletonText animated style={{ width: "100%" }} />
                ) : (
                  <p>Billing Period: {bills.item.billingPeriod}</p>
                )}
              </IonItem>
              <IonItem>
                {bills.loading ? (
                  <IonSkeletonText animated style={{ width: "75%" }} />
                ) : (
                  <p>Due Date: {bills.item.dueDate}</p>
                )}
              </IonItem>
              <IonItem lines="none">
                {bills.loading ? (
                  <IonSkeletonText animated style={{ width: "75%" }} />
                ) : (
                  <p>Disconnection Date: {bills.item.disconnectionDate}</p>
                )}
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};
