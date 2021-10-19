import { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IonFab, IonFabButton, IonIcon, IonPage, useIonPicker } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import Chart from "chart.js/auto";

import * as ChartUtils from "utils/chartUtils";
import { ScrollingContent } from "components";
import { peso } from "utils/helpers";

import "./Dashboard.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Dashboard: React.FC<Props> = (props) => {
  const [comparisonChart, setComparisonChart] = useState<any>();
  const chartCanvas = useRef<any>();
  const [value, setValue] = useState("");
  const [presentPicker] = useIonPicker();

  const showPicker = () => {
    presentPicker({
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Confirm",
          handler: (selected: any) => {
            setValue(selected.year.value);
          },
        },
      ],
      columns: [
        {
          name: "year",
          options: [
            { text: "2020-2021", value: "2021" },
            { text: "2019-2020", value: "2020" },
            { text: "2018-2019", value: "2019" },
          ],
        },
      ],
    });
  };

  const datas: any = {
    "2020": [
      8021.86, 5306.24, 8781.01, 9880.97, 4209.28, 162.3, 3093.24, 5845.95, 5491.95, 8765.18, 6733.37, 440.48,
    ],
    "2021": [8148.09, 3407.02, 3561.88, 1210.8, 6074.37, 9888.42, 8996.79, 8271.02, 7588.78],
  };
  const [previous, current] = Object.keys(datas);

  const labels = Object.keys(ChartUtils.MONTHS);
  const data = {
    labels: labels,
    datasets: [
      {
        label: previous,
        data: datas[previous],
        borderColor: ChartUtils.CHART_COLORS.red,
        backgroundColor: ChartUtils.transparentize(ChartUtils.CHART_COLORS.red, 0.5),
      },
      {
        label: current,
        data: datas[current],
        borderColor: ChartUtils.CHART_COLORS.blue,
        backgroundColor: ChartUtils.transparentize(ChartUtils.CHART_COLORS.blue, 0.5),
      },
    ],
  };

  const title = (tooltipItems: any[]): string => {
    const [item] = tooltipItems;
    return `${ChartUtils.MONTHS[item.label]}`;
  };

  const label = (tooltipItem: any): string => {
    return `${tooltipItem.dataset.label}: ${peso(tooltipItem.parsed.x)}`;
  };

  const footer = (tooltipItems: any[]): string => {
    const [previous, current] = tooltipItems;

    if (current) {
      return `Saved: ${peso(previous.parsed.x - current.parsed.x)}`;
    }

    return "";
  };

  useEffect(() => {
    if (chartCanvas.current) {
      const chart = new Chart(chartCanvas.current, {
        type: "bar",
        data: data,
        options: {
          interaction: {
            intersect: false,
            mode: "index",
            axis: "y",
          },
          indexAxis: "y",
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                title,
                label,
                footer,
              },
            },
            title: {
              display: true,
              text: "Bills Comparison",
            },
          },
        },
      });

      setComparisonChart(chart);
    }
  }, [chartCanvas]);

  return (
    <IonPage className="dashboard-page">
      <ScrollingContent {...props} title="Dashboard">
        <div className="chart-container">
          <canvas ref={chartCanvas} width="100%" height="100%"></canvas>
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={showPicker}>
            <IonIcon icon={calendarOutline} />
          </IonFabButton>
        </IonFab>
      </ScrollingContent>
    </IonPage>
  );
};
