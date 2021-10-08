import { IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import { SkeletonList, ScrollingContent, Refresher } from "components";
import { billActions } from "context";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useContext, AppContext } from "State";
import "./Bills.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Bills: React.FC<Props> = ({ history, ...props }) => {
  const { state, dispatch } = useContext(AppContext);
  const { bills } = state;
  const infiniteScroll = useRef<any>();
  const [fetchNextSet, setFetchNextSet] = useState<boolean>(false);

  const doRefresh = (refresher: any) => {
    infiniteScroll.current.disabled = false;
    dispatch(billActions.fetch(refresher.detail));
  };

  useEffect(() => dispatch(billActions.fetch()), []);

  useEffect(() => {
    if (bills.all?.nextPageUrl && fetchNextSet) {
      dispatch(billActions.fetchMore(infiniteScroll.current, bills.all?.nextPageUrl));
      setFetchNextSet(false);
    }
  }, [bills.all.nextPageUrl, fetchNextSet]);

  useEffect(() => {
    if (infiniteScroll.current) {
      infiniteScroll.current.disabled = false;
      infiniteScroll.current.addEventListener("ionInfinite", () => setFetchNextSet(true));
    }
  }, [infiniteScroll]);

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

        <IonInfiniteScroll threshold="100px" ref={infiniteScroll}>
          <IonInfiniteScrollContent loading-spinner="dots"></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </ScrollingContent>
    </IonPage>
  );
};
