(function (angular) {
  ("use strict");
  var myApp = angular.module("Dashboard", []);

  myApp.controller("DashBoardController", [
    "$scope",
    function ($scope) {
      /** visited pages */
      $scope.visitedPages = visitedPages;

      /** middle cards info */
      $scope.records = records;

      /** social traffic info */
      $scope.socialTraffic = socialTraffic;

      /** helper function to plot area chart */
      $scope.plotAreaChart = plotAreaChart;

      /** local var to store if side btns are clicke or not */
      $scope.sideBarBtns = {
        isDashClicked: false,
        isCalendarClicked: false,
        isInBoxClicked: false,
        isInVoiceClicked: false,
        isLabClicked: false,
      };

      /** track selected month ,year*/
      $scope.selectedMonth = "December";
      $scope.selectedYear = "2018";

      /** x asis for column chart */
      $scope.categories = [];

      /** chart data of column chart*/
      $scope.data = [];

      /** number of days in selected month */
      $scope.numOfDays = 31;

      /** max value for graph data */
      $scope.max = 9000;

      /** min value for graph data */
      $scope.min = 1000;

      /** reference for updating column chart func */
      // $scope.updateColumnChart = updateColumnChart;

      /** months array */
      $scope.months = monthsArr;

      /**years array */
      $scope.years = yearsArr;

      /** plot chart when content is loaded */
      angular.element(document).ready(function () {
        /**plot middle card charts */
        for (let record of $scope.records) {
          $scope.plotAreaChart($scope, record);
        }

        /** plot bottom card charts */
        for (let visitInfo of $scope.visitedPages) {
          $scope.plotAreaChart($scope, visitInfo);
        }

        $scope.updateColumnChart();
      });

      $scope.handleDashClicked = (key, handlerObj) => {
        Object.keys($scope[handlerObj]).forEach((key) => {
          if (key !== "isDashClicked") $scope[handlerObj][key] = false;
        });
        $scope[handlerObj][key] = !$scope.sideBarBtns[key];
      };

      $scope.updateColumnChart = () => {
        let index = $scope.months.indexOf($scope.selectedMonth);
        $scope.numOfDays = dayjs(
          `${$scope.selectedYear}-${index + 1}-01`
        ).daysInMonth();
        $scope.data = [];
        $scope.categories = [];
        for (let i = 1; i <= $scope.numOfDays; i++) {
          $scope.categories.push(i);
          $scope.data.push(
            Math.random() * ($scope.max - $scope.min) + $scope.min
          );
        }
        $scope.chart.update({
          xAxis: {
            categories: $scope.categories,
          },
          series: [
            {
              states: {
                hover: {
                  color: "#2454a3",
                },
              },
              pointWidth: 14,
              color: "#1051e0",
              showInLegend: false,
              name: "Visitors",
              data: $scope.data,
            },
          ],
        });
      };

      /** configure column chart */
      $scope.chart = Highcharts.chart("container", {
        title: {
          text: "",
        },
        chart: {
          type: "column",
        },
        credits: {
          enabled: false,
        },
        yAxis: {
          title: "",
          opposite: true,
          offset: 12,
          labels: {
            align: "right",
            x: 0,
            y: 22,
            // offset: 22,
            style: {
              fontSize: '10px',
            },
            formatter: function () {
              if (this.value > 0) {
                return '   '+this.value/1000 + 'K';
              }
            },
          },
        },
        xAxis: {
          categories: $scope.categories,
        },
        tooltip: {
          backgroundColor: "#FFFFFF",
          padding: 16,
          style: {
            // fontFamily: 'Segoe UI, Tahoma',
            fontSize: "14px",
            lineHeight: "21px",
            // paddingLeft: 7,
            // paddingRight: 5,
            paddingTop: 5,
          },
          formatter: function (d) {
            const getNth = () => {
              if (this.x > 3 && this.x < 21) return "TH";
              switch (this.x % 10) {
                case 1:
                  return "ST";
                case 2:
                  return "ND";
                case 3:
                  return "RD";
                default:
                  return "TH";
              }
            };
            const nth = getNth();
            var rV = `<span style="color:gray;font-weight:600;line-height:1em">${this.x}${nth} ${$scope.selectedMonth} ${$scope.selectedYear}</span><br/>`;
            rV += '<span style="display:none">s</span>' + "<br/>";
            rV +=
              '<span style="color:' +
              this.point.color +
              '">\u25CF</span> ' +
              this.series.name +
              ": <b> " +
              this.y.toFixed(0) +
              "</b><br/>";
            return rV;
          },
        },
        series: [
          {
            states: {
              hover: {
                color: "#2454a3",
                // borderColor: "gray",
              },
            },
            pointWidth: 14,
            color: "#1051e0",
            showInLegend: false,
            name: "Visitors",
            data: $scope.data,
          },
        ],
      });
    },
  ]);
})(window.angular);
