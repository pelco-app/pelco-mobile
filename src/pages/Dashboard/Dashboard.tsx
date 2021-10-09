import { RouteComponentProps } from "react-router-dom";
import { IonPage } from "@ionic/react";

import { ScrollingContent } from "components";

import "./Dashboard.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Dashboard: React.FC<Props> = (props) => {
  return (
    <IonPage>
      <ScrollingContent {...props} title="Dashboard"></ScrollingContent>
    </IonPage>
  );
};
