import { Children, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

interface Props extends RouteComponentProps<any> {
  className?: string;
  scrollToTop: number;
  title: string;
}

export const ScrollingContent: React.FC<Props> = ({ className, title, scrollToTop, children }) => {
  const ionContent = useRef<any>();

  useEffect(() => scrollToTop > 0 && ionContent.current.scrollToTop(500), [scrollToTop]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen ref={ionContent} className={className}>
        {Children.toArray(children)}
      </IonContent>
    </>
  );
};
