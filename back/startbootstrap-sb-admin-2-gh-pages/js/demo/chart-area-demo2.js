// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const loggedInUserEmail = loggedInUser.email;
  
  const rawInitiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
  const initiatives = rawInitiatives.filter(initiative => initiative.gestor === loggedInUserEmail);

  // Get today's date and the start of the last 12 months
  const today = new Date();
  const months = [];
  const monthlyParticipantsCount = Array(12).fill(0);
  const monthlyInitiativesCount = Array(12).fill(0);

  // Generate month labels for the past 12 months
  for (let i = 11; i >= 0; i--) {
    const currentMonth = new Date(today.getFullYear(), today.getMonth() - i);
    const monthLabel = currentMonth.toLocaleString('pt-PT', { month: 'short' });
    months.push(monthLabel);
  }

  // Calculate participants and initiatives count for each of the past 12 months
  initiatives.forEach(initiative => {
    const initiativeDate = new Date(initiative.data);
    const diffInMonths = (today.getFullYear() - initiativeDate.getFullYear()) * 12 + today.getMonth() - initiativeDate.getMonth();

    if (diffInMonths >= 0 && diffInMonths < 12) {
      monthlyInitiativesCount[11 - diffInMonths] += 1;
      monthlyParticipantsCount[11 - diffInMonths] += initiative.participantes.length;
    }
  });

  // Update the Area Chart with the calculated data
  const ctx = document.getElementById("myAreaChart").getContext('2d');
  const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: "Participantes",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: monthlyParticipantsCount,
        yAxisID: 'y-axis-participants' // Use primary axis
      }, {
        label: "Iniciativas",
        lineTension: 0.3,
        backgroundColor: "rgba(28, 200, 138, 0.05)",
        borderColor: "rgba(28, 200, 138, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(28, 200, 138, 1)",
        pointBorderColor: "rgba(28, 200, 138, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(28, 200, 138, 1)",
        pointHoverBorderColor: "rgba(28, 200, 138, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: monthlyInitiativesCount,
        yAxisID: 'y-axis-initiatives' // Use secondary axis
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          }
        }],
        yAxes: [{
          id: 'y-axis-participants', // Primary Y-axis for participants
          position: 'left',
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            callback: function(value) {
              return value;
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }, {
          id: 'y-axis-initiatives', // Secondary Y-axis for initiatives
          position: 'right',
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            callback: function(value) {
              return value;
            }
          },
          gridLines: {
            drawOnChartArea: false // Keep initiatives' gridlines separate
          }
        }]
      },
      legend: {
        display: true // Display the legend to differentiate the datasets
      },
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            var value = tooltipItem.yLabel;
            return `${datasetLabel}: ${value}`;
          }
        }
      }
    }
  });
});
