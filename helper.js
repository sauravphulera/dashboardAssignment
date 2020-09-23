const plotAreaChart = ($scope, record) => {
    let data = [];
    for (let i = 0, t = 100; i < t - 80; i++) {
      data.push(Math.round(Math.random() * t + 100));
    }
    $scope.areaChart = Highcharts.chart(record.id, {
  
      chart: {
        type: "area",
      },
      credits: {
        enabled: false
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
      tooltip: {
        enabled: false,
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