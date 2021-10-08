import { IonPage } from "@ionic/react";
import { ScrollingContent } from "components";
import { RouteComponentProps } from "react-router-dom";
import { AppContext, useContext } from "State";
import "./Dashboard.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Dashboard: React.FC<Props> = (props) => {
  const { state } = useContext(AppContext);

  return (
    <IonPage>
      <ScrollingContent {...props} title="Dashboard"></ScrollingContent>
    </IonPage>
  );
};
