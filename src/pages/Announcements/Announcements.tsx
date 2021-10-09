import { RouteComponentProps } from "react-router-dom";
import { IonPage } from "@ionic/react";

import { ExploreContainer, ScrollingContent } from "components";

import "./Announcements.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Announcements: React.FC<Props> = (props) => {
  return (
    <IonPage>
      <ScrollingContent {...props} title="Announcements">
        <ExploreContainer name="Announcements page" />
      </ScrollingContent>
    </IonPage>
  );
};
