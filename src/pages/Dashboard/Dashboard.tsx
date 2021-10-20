import { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { RefresherEventDetail } from "@ionic/core";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLoading,
  IonPage,
  IonPicker,
  IonSkeletonText,
  IonText,
  PickerButton,
  PickerColumn,
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import Chart, { ChartConfiguration } from "chart.js/auto";

import * as ChartUtils from "utils/chartUtils";
import { percentageChange, peso } from "utils/helpers";
import { useIsMounted } from "utils/hooks";
import { Refresher, ScrollingContent } from "components";
import { dashboardActions, useAppDispatch, useAppSelector } from "states";

import "./Dashboard.scss";

interface Props extends RouteComponentProps<any> {
  scrollToTop: number;
}

export const Dashboard: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { dashboard } = useAppSelector((state) => state);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedPickerIndex, setSelectedPickerIndex] = useState<number>(0);
  const [savedDifference, setSavedDifference] = useState<number>(0);
  const [savedPercentage, setSavedPercentage] = useState<string | boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [comparisonChart, setComparisonChart] = useState<any>();
  const [comparableYears, setComparableYears] = useState<any[]>([]);
  const isMounted = useIsMounted();
  const chartCanvas = useRef<any>();

  const pickerButtons: PickerButton[] = [
    {
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "Confirm",
      handler: (selected) => {
        const selectedIndex = comparableYears.findIndex((year) => year.value === selected.year.value);

        if (selectedPickerIndex !== selectedIndex) {
          setSelectedYear(selected.year.value);
          setSelectedPickerIndex(selectedIndex);
          dispatch(dashboardActions.fetch({ year: selected.year.value }));
        }

        setShowPicker(false);
      },
    },
  ];

  const pickerColumns: PickerColumn[] = [
    {
      name: "year",
      options: [...comparableYears.map((year) => ({ text: year.text, value: year.value }))],
      selectedIndex: selectedPickerIndex,
    },
  ];

  const doRefresh = (refresher: CustomEvent<RefresherEventDetail>) => {
    dispatch(dashboardActions.fetch({ year: selectedYear })).then(() => {
      refresher.detail.complete();
    });
  };

  useEffect(() => {
    if (!isMounted) {
      dispatch(dashboardActions.fetch({ year: selectedYear }));
    }
  }, [isMounted]);

  useEffect(() => {
    if (dashboard.comparableYears.length > 0 && comparableYears.length === 0) {
      setComparableYears(dashboard.comparableYears);
    }
  }, [dashboard.comparableYears, comparableYears]);

  useEffect(() => {
    const [previous, current] = dashboard.totalBillsPerYear;
    setSavedDifference(current?.value - previous?.value);
    setSavedPercentage(percentageChange(previous?.value, current?.value));
  }, [dashboard.totalBillsPerYear]);

  useEffect(() => {
    if (chartCanvas.current && Object.keys(dashboard.billYearPairs).length > 0) {
      const [previous, current] = Object.keys(dashboard.billYearPairs);

      if (!comparisonChart) {
        const chartData = {
          labels: Object.keys(ChartUtils.MONTHS),
          datasets: [
            {
              label: previous,
              data: dashboard.billYearPairs[previous],
              borderColor: ChartUtils.CHART_COLORS.red,
              backgroundColor: ChartUtils.transparentize(ChartUtils.CHART_COLORS.red, 0.5),
            },
            {
              label: current,
              data: dashboard.billYearPairs[current],
              borderColor: ChartUtils.CHART_COLORS.blue,
              backgroundColor: ChartUtils.transparentize(ChartUtils.CHART_COLORS.blue, 0.5),
            },
          ],
        };

        const chartConfig: ChartConfiguration = {
          type: "bar",
          data: chartData,
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
                  title: ChartUtils.chartTitle,
                  label: ChartUtils.chartLabel,
                  footer: ChartUtils.chartFooter,
                },
              },
            },
          },
        };
        setComparisonChart(new Chart(chartCanvas.current, chartConfig));
      } else {
        comparisonChart.data.datasets[0].label = previous;
        comparisonChart.data.datasets[1].label = current;
        comparisonChart.data.datasets[0].data = dashboard.billYearPairs[previous];
        comparisonChart.data.datasets[1].data = dashboard.billYearPairs[current];
        comparisonChart.update();
      }
    }
  }, [chartCanvas, comparisonChart, dashboard.billYearPairs]);

  return (
    <IonPage>
      <IonLoading isOpen={dashboard.loading} message="Please wait..." />

      <ScrollingContent {...props} className="dashboard-page" title="Dashboard">
        <Refresher onRefresh={doRefresh} />

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {dashboard.loading ? <IonSkeletonText animated style={{ width: "50%" }} /> : "Bills Comparison"}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent className="card-content">
            {dashboard.totalBillsPerYear.map((total: any, index: number) => (
              <IonItem key={index}>
                {dashboard.loading ? (
                  <IonSkeletonText animated style={{ width: "50%" }} />
                ) : (
                  <p>
                    Total bill for year {total.year}: {peso(total.value)}
                  </p>
                )}
              </IonItem>
            ))}
            <IonItem lines="none">
              {dashboard.loading ? (
                <IonSkeletonText animated style={{ width: "60%" }} />
              ) : (
                <p>
                  vs past period:{" "}
                  <IonText color={savedDifference < 0 ? "success" : "danger"}>
                    {savedDifference > 0 && "+"}
                    {peso(savedDifference)}{" "}
                    {savedPercentage && `(${savedDifference > 0 ? "+" : ""}${savedPercentage})`}
                  </IonText>
                </p>
              )}
            </IonItem>
          </IonCardContent>
        </IonCard>

        <div className={`chart-container ${dashboard.loading ? "hidden" : ""}`}>
          <canvas ref={chartCanvas} width="100%" height="100%"></canvas>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowPicker(true)}>
            <IonIcon icon={calendarOutline} />
          </IonFabButton>
        </IonFab>

        <IonPicker
          buttons={pickerButtons}
          columns={pickerColumns}
          isOpen={showPicker}
          onWillDismiss={() => {
            setShowPicker(false);
          }}
        />
      </ScrollingContent>
    </IonPage>
  );
};
