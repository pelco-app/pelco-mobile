import { IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText } from "@ionic/react";

interface Props {
  count: number;
  hasHeader?: boolean;
}

export const SkeletonList: React.FC<Props> = ({ count, hasHeader }) => {
  return (
    <IonList>
      {hasHeader && (
        <IonListHeader>
          <IonSkeletonText animated style={{ width: "50%" }} />
        </IonListHeader>
      )}
      {Array(count)
        .fill(null)
        .map((val, index) => (
          <IonItem key={index}>
            <div slot="start" className="badge">
              <IonSkeletonText animated style={{ width: "100%" }} />
            </div>
            <IonLabel>
              <h2>
                <IonSkeletonText animated style={{ width: "25%" }} />
              </h2>
              <p>
                <IonSkeletonText animated style={{ width: "20%" }} />
              </p>
              <p>
                <IonSkeletonText animated style={{ width: "30%" }} />
              </p>
            </IonLabel>
          </IonItem>
        ))}
    </IonList>
  );
};
