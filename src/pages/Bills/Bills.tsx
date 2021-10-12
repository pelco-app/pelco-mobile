import { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";

import { Refresher, ScrollingContent, SkeletonList } from "components";
import { billActions, useAppDispatch, useAppSelector } from "states";

import "./Bills.scss";

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

        {bills.loading ? (
          <SkeletonList count={10} />
        ) : (
          <IonList>
            {bills.all?.data?.map((billingData: any) => (
              <IonItem key={billingData.id} onClick={() => history?.push(`/bills/${billingData.id}`)}>
                <div slot="start" className={`badge ${billingData.unread ? "unread" : ""}`}></div>
                <IonLabel>
                  <h2>{billingData.billingMonth}</h2>
                  <p>{billingData.billingReference}</p>
                  <p>Due Date: {billingData.dueDate}</p>
                </IonLabel>
              </IonItem>
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
