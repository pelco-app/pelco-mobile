import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RefresherEventDetail } from "@ionic/core";
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";

import { Refresher, ScrollingContent, SkeletonList } from "components";
import { scheduleActions, useAppDispatch, useAppSelector } from "states";
import { truncate } from "utils/helpers";

import "./Schedules.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Schedules: React.FC<Props> = ({ history, ...props }) => {
  const dispatch = useAppDispatch();
  const { schedules } = useAppSelector((state) => state);
  const ionInfinite = useRef<any>();
  const [fetchNextSet, setFetchNextSet] = useState<boolean>(false);

  const doRefresh = (refresher: CustomEvent<RefresherEventDetail>) => {
    dispatch(scheduleActions.fetch()).then((response: any) => {
      refresher.detail.complete();
      ionInfinite.current.disabled = !response.payload.nextPageUrl;
    });
  };

  useEffect((): any => dispatch(scheduleActions.fetch()), []);

  useEffect(() => {
    if (schedules.all?.nextPageUrl && fetchNextSet) {
      dispatch(scheduleActions.fetchMore(schedules.all?.nextPageUrl)).then((response: any) => {
        ionInfinite.current.complete();
        ionInfinite.current.disabled = !response.payload.nextPageUrl;
      });
      setFetchNextSet(false);
    }
  }, [schedules.all.nextPageUrl, fetchNextSet]);

  useEffect(() => {
    if (ionInfinite.current) {
      ionInfinite.current.disabled = false;
      ionInfinite.current.addEventListener("ionInfinite", () => setFetchNextSet(true));
    }
  }, [ionInfinite]);

  return (
    <IonPage>
      <ScrollingContent {...props} className="schedules-page" history={history} title="Schedules">
        <Refresher onRefresh={doRefresh} />

        {schedules.loading && history.location.pathname === "/schedules" ? (
          <SkeletonList count={10} />
        ) : schedules.all?.data?.length > 0 ? (
          <IonList>
            {schedules.all?.data?.map((scheduleData: any, index: number) => (
              <IonItem
                button
                className={scheduleData.unread ? "unread" : ""}
                key={scheduleData.id}
                lines={index === schedules.all.data.length - 1 ? "none" : "inset"}
                routerLink={`/schedules/${scheduleData.id}`}
              >
                <div slot="start" className="badge"></div>
                <IonLabel className="ion-text-wrap">
                  <h3>{scheduleData.title}</h3>
                  <>
                    <p>{truncate(scheduleData.description, 50)}</p>
                    <p>Start: {scheduleData.startDate}</p>
                    <p>End: {scheduleData.endDate}</p>
                  </>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <div className="center-screen">No schedules found</div>
        )}

        {schedules.all?.data?.length !== 0 && (
          <IonInfiniteScroll threshold="100px" ref={ionInfinite}>
            <IonInfiniteScrollContent loading-spinner="dots"></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        )}
      </ScrollingContent>
    </IonPage>
  );
};
