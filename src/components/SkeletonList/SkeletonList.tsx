import { IonItem, IonLabel, IonList, IonSkeletonText } from "@ionic/react";

interface Props {
  count: number;
}

export const SkeletonList: React.FC<Props> = ({ count }) => {
  return (
    <IonList>
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
