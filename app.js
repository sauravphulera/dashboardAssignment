(function (angular) {
  ("use strict");
  var myApp = angular.module("Dashboard", []);

  myApp.controller("DashController", [
    "$scope",
    function ($scope) {
      $scope.spice = "very";
      $scope.visitedPages = visitedPages;
      $scope.records = records;
      $scope.socialTraffic = socialTraffic;
      $scope.sideBarBtns = {
        isDashClicked: false,
        isCalendarClicked: false,
        isInBoxClicked: false,
        isInVoiceClicked: false,
        isLabClicked: false,
      };

      ($scope.selectedMonth = "December"),
        ($scope.selectedYear = "2018"),
        ($scope.categories = []);
      $scope.data = [];
      $scope.numOfDays = 31;
      $scope.max = 9000;
      $scope.min = 1000;

      for (let i = 1; i <= $scope.numOfDays; i++) {
        $scope.categories.push(i);
        $scope.data.push(
          Math.random() * ($scope.max - $scope.min) + $scope.min
        );
      }

      $scope.updateGraph = () => {
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
              color: "#1051e0",
              showInLegend: false,
              name: "Visitors",
              data: $scope.data,
            },
          ],
        });
      };

      $scope.months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      $scope.years = [
        "2018",
        "2019",
        "2020",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "2010",
      ];
      $scope.handleDashClicked = (key, handlerObj) => {
        Object.keys($scope[handlerObj]).forEach((key) => {
          if (key !== "isDashClicked") $scope[handlerObj][key] = false;
        });
        $scope[handlerObj][key] = !$scope.sideBarBtns[key];
      };

      $scope.chart = Highcharts.chart("container", {
        title: {
          text: "",
        },
        chart: {
          type: "column",
        },
        yAxis: {
          title: "",
          opposite: true,
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
      angular.element(document).ready(function () {
        for (let record of $scope.records) {
          plotAreaChart($scope, record);
        }
        for (let visitInfo of $scope.visitedPages) {
          plotAreaChart($scope, visitInfo);
        }
      });
    },
  ]);
})(window.angular);
function plotAreaChart($scope, record) {
  let data = [];
  for (let i = 0, t = 100; i < t - 80; i++) {
    data.push(Math.round(Math.random() * t + 100));
  }
  $scope.areaChart = Highcharts.chart(record.id, {
    chart: {
      type: "area",
    },
    title: {
      text: "",
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      title: "",
      visible: false,
    },
    plotOptions: {
      series: {
        fillOpacity: 0.1,
      },
      area: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: record.name,
        showInLegend: false,
        color: record.chartColor,
        data: data,
      },
    ],
  });
}

