      // Population Chart

        Chart.defaults.font.size = 11;
        var ctxPop = document.getElementById('popChart').getContext('2d');
        var popChart = new Chart(ctxPop, {
            type: 'bar',
            data: {
                labels: ['0~9', '10~19', '20~29', '30~39', '40~49', '50~59', '60~69', '70+'],
                datasets: [
                    {
                        label: 'Male Population',
                        data: [msum_0, msum_10, msum_20, msum_30, msum_40, msum_50, msum_60, msum_70],
                        backgroundColor: 'rgba(0, 123, 255, 0.5)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Female Population',
                        data: [fsum_0, fsum_10, fsum_20, fsum_30, fsum_40, fsum_50, fsum_60, fsum_70],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: '인구통계',
                        padding: {
                            top: 10,
                            bottom: 10
                        }
                    }
                }
            }
        });

        // Hospital Chart
            var ctxHospital = document.getElementById('hospitalChart').getContext('2d');
            var hospitalChart = new Chart(ctxHospital, {
                type: 'line',
                data: {
                    labels: {{ hospital_types|safe }},
                    datasets: [
                        {
                            label: 'Hospitals',
                            data: {{ hospital_hospitals|safe }},
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            fill: true,
                            borderWidth: 2,
                            tension: 0.1
                        },
                        {
                            label: 'Doctors',
                            data: {{ hospital_doctors|safe }},
                            borderColor: 'rgba(255, 206, 86, 1)',
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            fill: true,
                            borderWidth: 2,
                            tension: 0.1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,

                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,

                            },
                            beginAtZero: true
                        }
                    },plugins: {
            title: {
                display: true,
                text: '진료과목별 의료기관과 전문의수 비교현황',
                padding: {
                    top: 10,
                    bottom: 10
                }
            }
        }
                }
            });

        // CountCost Chart
            var mixedChart = document.getElementById('tocostChart').getContext('2d');
            var tocostChart = new Chart(mixedChart, {
                type: 'bar',
                data: {
                    datasets: [{
                        type: 'bar',
                        label: '진료수(건)',
                        yAxisID: 'left-y-axis',
                        data: {{ numtre_numtres|safe }},
                        backgroundColor: 'rgba(0, 123, 255, 0.5)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1
                    }, {
                        type: 'line',
                        label: '진료비(천원)',
                        yAxisID: 'right-y-axis',
                        data: {{ tocost_tocosts|safe }},
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        borderWidth: 2,
                    }],
                    labels: ['1998년', '1999년', '2000년', '2001년', '2002년']
                },
                options: {
                    responsive: true,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        x: {
                display: true,
                title: {
                    display: true,
                    text: '년도'
                }
            },
            y: {
                left: {
                    type: 'bar',
                    position: 'left',
                    display: true,
                    ticks: {
                        display: true,
                        text: '진료수(건)'
                    }
                },
                right: {
                    type: 'linear',
                    position: 'right',
                    display: true,
                    ticks: {
                        display: true,
                        text: '진료비(천원)'
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: '진료 건수와 진료비 추이',
                padding: {
                    top: 10,
                    bottom: 10
                }
            }
        }
    }
});

        // Hospital counts Chart
        var ctxCounts = document.getElementById('countsChart').getContext('2d');
            var countsChart = new Chart(ctxCounts, {
                type: 'bar',
                data: {
                    labels: {{counts_regions|safe}},
                    datasets: [
                        {
                            label: '병의원',
                            data: {{counts_clinics|safe}},
                            backgroundColor: 'rgba(0, 123, 255, 0.5)',
                            borderColor: 'rgba(0, 123, 255, 1)',
                            borderWidth: 1
                        },
                        {
                            label: '보건소',
                            data: {{counts_healthcenters|safe}},
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: '약국',
                            data: {{ counts_pharmacys|safe }},
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: '치과',
                            data: {{ counts_dentists|safe }},
                            backgroundColor: 'rgba(255, 206, 86, 0.5)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        },
                        {
                            label: '한의원',
                            data:{{ counts_orientals|safe }},
                            backgroundColor: 'rgba(153, 102, 255, 0.5)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: '읍면동별 의료기관 현황',
                            padding: {
                                top: 10,
                                bottom: 10
                            }
                        }
                    }
                }
            });

<