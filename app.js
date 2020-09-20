// import * as dayjs from 'dayjs'
(function (angular) {
  "use strict";
  var myApp = angular.module("Dashboard", []);

  myApp.controller("DashController", [
    "$scope",
    function ($scope) {
      $scope.spice = "very";
      $scope.records = [
        {
          title: "REALTIME USERS",
          value: "56",
          rate: "+9.8%",
          color: "green",
          id: "usersContainer",
          chartColor: "#1051e0",
        },
        {
          title: "TOTAL VISITORS",
          value: "54,598",
          rate: "-11.9%",
          color: "red",
          id: "visitorsContainer",
          chartColor: "#29a125",
        },
        {
          title: "BOUNCE RATE",
          value: "73.67%",
          rate: "+12.2%",
          color: "green",
          id: "bounceContainer",
          chartColor: "#784fc4",
        },
        {
          title: "VISIT DURATION",
          value: "1m 4s",
          rate: "+19.6%",
          color: "green",
          id: "visitDurationContainer",
          chartColor: "#e3c756",
        },
      ];
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
        console.log($scope.numOfDays);
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
            const day =
              this.x === 1
                ? "1ST"
                : this.x === 2
                ? "2ND"
                : this.x === 3
                ? "3RD"
                : `${this.x}TH`;
            var rV = `<span style="color:gray;font-weight:600;line-height:1em">${day} ${$scope.selectedMonth} ${$scope.selectedYear}</span><br/>`;
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
        console.log("heya");
        for (let record of $scope.records) {
          console.log(record);
          let data = [];
          for (let i = 0, t = 100; i < t - 80; i++) {
            data.push(Math.round(Math.random() * t));
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
      });
    },
  ]);
})(window.angular);
