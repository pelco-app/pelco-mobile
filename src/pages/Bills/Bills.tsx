import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from "@ionic/react";

import { Refresher, ScrollingContent, SkeletonList } from "components";
import { billActions, useAppDispatch, useAppSelector } from "states";

import "./Bills.scss";
import { groupByArray } from "utils/helpers";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Bills: React.FC<Props> = ({ history, ...props }) => {
  const dispatch = useAppDispatch();
  const { bills } = useAppSelector((state) => state);
  const ionInfinite = useRef<any>();
  const [fetchNextSet, setFetchNextSet] = useState<boolean>(false);

  const doRefresh = (refresher: any) => {
    dispatch(billActions.fetch()).then((response: any) => {
      refresher.detail.complete();
      ionInfinite.current.disabled = !response.payload.nextPageUrl;
    });
  };

  useEffect(() => dispatch(billActions.fetch()), []);

  useEffect(() => {
    if (bills.all?.nextPageUrl && fetchNextSet) {
      dispatch(billActions.fetchMore(bills.all?.nextPageUrl)).then((response: any) => {
        ionInfinite.current.complete();
        ionInfinite.current.disabled = !response.payload.nextPageUrl;
      });
      setFetchNextSet(false);
    }
  }, [bills.all.nextPageUrl, fetchNextSet]);

  useEffect(() => {
    if (ionInfinite.current) {
      ionInfinite.current.disabled = false;
      ionInfinite.current.addEventListener("ionInfinite", () => setFetchNextSet(true));
    }
  }, [ionInfinite]);

  return (
    <IonPage>
      <ScrollingContent {...props} history={history} title="Bills">
        <Refresher onRefresh={doRefresh} />

        {bills.loading && history.location.pathname === "/bills" ? (
          <SkeletonList count={10} hasHeader />
        ) : (
          <IonList>
            {groupByArray(bills.all?.data, "billingYear").map((group, index) => (
              <React.Fragment key={index}>
                <IonListHeader>
                  <IonLabel>{group.key}</IonLabel>
                </IonListHeader>
                {group.values?.map((billingData: any, index: number) => (
                  <IonItem
                    button
                    className={billingData.unread ? "unread" : ""}
                    key={billingData.id}
                    lines={index === group.values.length - 1 ? "none" : "inset"}
                    routerLink={`/bills/${billingData.id}`}
                  >
                    <div slot="start" className="badge"></div>
                    <IonLabel className="ion-text-wrap">
                      <h3>
                        {billingData.billingMonth} {billingData.billingYear}
                      </h3>
                      {billingData.totalAmountDue > 0 && (
                        <>
                          <p>Due Date: {billingData.dueDate}</p>
                          <p>Amount Due: ₱{billingData.totalAmountDue}</p>
                        </>
                      )}
                    </IonLabel>
                  </IonItem>
                ))}
              </React.Fragment>
            ))}
          </IonList>
        )}

        <IonInfiniteScroll threshold="100px" ref={ionInfinite}>
          <IonInfiniteScrollContent loading-spinner="dots"></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </ScrollingContent>
    </IonPage>
  );
};
