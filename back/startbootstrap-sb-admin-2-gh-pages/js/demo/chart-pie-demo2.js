// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loggedInUserEmail = loggedInUser.email;

    // Filter the initiatives by user
    const rawInitiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiatives = rawInitiatives.filter(initiative => initiative.gestor === loggedInUserEmail);

    // Initialize counts for each type of initiative
    const initiativeTypes = ['Corrida/Maratona', 'Aulas', 'Jogos de Futebol', 'Workshop', 'Outro'];
    const typeCounts = {
        'Corrida/Maratona': 0,
        'Aulas': 0,
        'Jogos de Futebol': 0,
        'Workshop': 0,
        'Outro': 0
    };

    // Count the occurrences of each type of initiative
    initiatives.forEach(initiative => {
        if (typeCounts.hasOwnProperty(initiative.type)) {
            typeCounts[initiative.type]++;
        }
    });

    // Prepare the data for the pie chart
    const chartLabels = initiativeTypes;
    const chartData = chartLabels.map(type => typeCounts[type]);
    const backgroundColors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'];
    const hoverBackgroundColors = ['#2e59d9', '#17a673', '#2c9faf', '#f4b619', '#e02d1b'];

    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors,
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: true,
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.labels[tooltipItem.index] || '';
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return label + ': ' + value;
                    }
                }
            },
            legend: {
                display: true,
                position: 'bottom'
            },
            cutoutPercentage: 60,
        }
    });
});
