// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

const donations = JSON.parse(localStorage.getItem('donations')) || predefinedDonations;

// Initialize totals for each type of donation
let totalOnlineDonations = 0;
let totalFieldDonations = 0;
let totalSponsorDonations = 0;

// Calculate the total donations for each type
donations.forEach(donation => {
    switch (donation.type) {
        case 'Online':
            totalOnlineDonations += donation.montante;
            break;
        case 'Field':
            totalFieldDonations += donation.montante;
            break;
        case 'Sponsor':
            totalSponsorDonations += donation.montante;
            break;
    }
});

// Create a number formatter for US English.
const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Online", "Patrocinadores", "No Terreno"],
        datasets: [{
            data: [totalOnlineDonations, totalSponsorDonations, totalFieldDonations],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
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
                    return label + ': ' + formatter.format(value);
                }
            }
        },
        legend: {
            display: false
        },
        cutoutPercentage: 60,
    }
});