import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { Children, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
  title: string;
}

export const ScrollingContent: React.FC<Props> = ({ title, scrollToTop, children }) => {
  const ionContent = useRef<any>();

  useEffect(() => {
    if (scrollToTop > 0) {
      ionContent.current.scrollToTop(500);
    }
  }, [scrollToTop]);

  return (
    <>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="small">{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bills-page" ref={ionContent}>
        {Children.toArray(children)}
      </IonContent>
    </>
  );
};