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
import { announcementActions, useAppDispatch, useAppSelector } from "states";
import { truncate } from "utils/helpers";

import "./Announcements.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Announcements: React.FC<Props> = ({ history, ...props }) => {
  const dispatch = useAppDispatch();
  const { announcements } = useAppSelector((state) => state);
  const ionInfinite = useRef<any>();
  const [fetchNextSet, setFetchNextSet] = useState<boolean>(false);

  const doRefresh = (refresher: CustomEvent<RefresherEventDetail>) => {
    dispatch(announcementActions.fetch()).then((response: any) => {
      refresher.detail.complete();
      ionInfinite.current.disabled = !response.payload.nextPageUrl;
    });
  };

  useEffect((): any => dispatch(announcementActions.fetch()), []);

  useEffect(() => {
    if (announcements.all?.nextPageUrl && fetchNextSet) {
      dispatch(announcementActions.fetchMore(announcements.all?.nextPageUrl)).then((response: any) => {
        ionInfinite.current.complete();
        ionInfinite.current.disabled = !response.payload.nextPageUrl;
      });
      setFetchNextSet(false);
    }
  }, [announcements.all.nextPageUrl, fetchNextSet]);

  useEffect(() => {
    if (ionInfinite.current) {
      ionInfinite.current.disabled = false;
      ionInfinite.current.addEventListener("ionInfinite", () => setFetchNextSet(true));
    }
  }, [ionInfinite]);

  return (
    <IonPage>
      <ScrollingContent {...props} className="announcements-page" history={history} title="Announcements">
        <Refresher onRefresh={doRefresh} />

        {announcements.loading && history.location.pathname === "/announcements" ? (
          <SkeletonList count={10} />
        ) : (
          <IonList>
            {announcements.all?.data?.map((announcementData: any, index: number) => (
              <IonItem
                button
                className={announcementData.unread ? "unread" : ""}
                key={announcementData.id}
                lines={index === announcements.all.data.length - 1 ? "none" : "inset"}
                routerLink={`/announcements/${announcementData.id}`}
              >
                <div slot="start" className="badge"></div>
                <IonLabel className="ion-text-wrap">
                  <h3>{announcementData.title}</h3>
                  <>
                    <p>{truncate(announcementData.description, 50)}</p>
                    <p>Date: {announcementData.createdAt}</p>
                  </>
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
