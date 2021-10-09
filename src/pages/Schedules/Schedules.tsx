import { RouteComponentProps } from "react-router-dom";
import { IonPage } from "@ionic/react";

import { ExploreContainer, ScrollingContent } from "components";

import "./Schedules.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Schedules: React.FC<Props> = (props) => {
  return (
    <IonPage>
      <ScrollingContent {...props} title="Schedules">
        <ExploreContainer name="Schedules page" />
      </ScrollingContent>
    </IonPage>
  );
};
