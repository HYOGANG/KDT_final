        const coordinates = {
          top: 0,
          bottom : 0,
          left : 0,
          right : 0,
        }

        lista = ['가정의학과','내과','소아청소년과','신경과','정신건강의학과', '재활의학과' , '피부과'];
        listb =  ['비뇨의학과','산부인과','성형외과','신경외과','심장혈관흉부외과','안과','외과','이비인후과','정형외과'];
        listc = ['마취통증의학과','방사선종양학과','병리과','영상의학과','응급의학과','진단검사의학과','직업환경의학과','핵의학과'];

        a = [22, 1, 11, 2, 3, 20, 14]
        b = [15, 10, 8, 6, 7, 12, 4, 13, 5]
        c = [9, 17, 18, 16, 23, 24, 19, 21]


         const depData = [
           {
           dep: '내과계',
           color: 'rgba(0, 123, 255, 0.5)',
           count: {{ doctor.22.sum|add:doctor.1.sum|add:doctor.11.sum|add:doctor.2.sum|add:doctor.3.sum|add:doctor.20.sum|add:doctor.14.sum }},
           doctorData: [
                    { depart : '{{ doctor.22.department }}', doctors: {{ doctor.22.sum }} },
                    { depart : '{{ doctor.1.department }}', doctors: {{ doctor.1.sum }} },
                    { depart : '{{ doctor.11.department }}', doctors: {{ doctor.11.sum }} },
                    { depart : '{{ doctor.2.department }}', doctors: {{ doctor.2.sum }} },
                    { depart : '{{ doctor.3.department }}', doctors: {{ doctor.3.sum }} },
                    { depart : '{{ doctor.20.department }}', doctors: {{ doctor.20.sum }} },
                    { depart : '{{ doctor.14.department }}', doctors: {{ doctor.14.sum }} }
                ] },

            {
           dep: '외과계',
           color: 'rgba(0, 123, 255, 0.5)',
            count: {{ doctor.15.sum|add:doctor.10.sum|add:doctor.8.sum|add:doctor.6.sum|add:doctor.7.sum|add:doctor.12.sum|add:doctor.4.sum|add:doctor.13.sum|add:doctor.5.sum }},
           doctorData: [
                { depart : '{{ doctor.15.department }}', doctors: {{ doctor.15.sum }} },
                { depart : '{{ doctor.10.department }}', doctors: {{ doctor.10.sum }} },
                { depart : '{{ doctor.8.department }}', doctors: {{ doctor.8.sum }} },
                { depart : '{{ doctor.6.department }}', doctors: {{ doctor.6.sum }} },
                { depart : '{{ doctor.7.department }}', doctors: {{ doctor.7.sum }} },
                { depart : '{{ doctor.12.department }}', doctors: {{ doctor.12.sum }} },
                { depart : '{{ doctor.4.department }}', doctors: {{ doctor.4.sum }} },
                { depart : '{{ doctor.13.department }}', doctors: {{ doctor.13.sum }} },
                { depart : '{{ doctor.5.department }}', doctors: {{ doctor.5.sum }} },
                ] },

            {
           dep: '지원계',
           color: 'rgba(0, 123, 255, 0.5)',
           count: {{ doctor.9.sum|add:doctor.17.sum|add:doctor.18.sum|add:doctor.16.sum|add:doctor.23.sum|add:doctor.24.sum|add:doctor.19.sum|add:doctor.21.sum }},
           doctorData: [
                { depart : '{{ doctor.9.department }}', doctors: {{ doctor.9.sum }} },
                { depart : '{{ doctor.17.department }}', doctors: {{ doctor.17.sum }} },
                { depart : '{{ doctor.18.department }}', doctors: {{ doctor.18.sum }} },
                { depart : '{{ doctor.16.department }}', doctors: {{ doctor.16.sum }} },
                { depart : '{{ doctor.23.department }}', doctors: {{ doctor.23.sum }} },
                { depart : '{{ doctor.24.department }}', doctors: {{ doctor.24.sum }} },
                { depart : '{{ doctor.19.department }}', doctors: {{ doctor.19.sum }} },
                { depart : '{{ doctor.21.department }}', doctors: {{ doctor.21.sum }} },

                ]
                }
        ];


     // setup
    const data = {
      datasets: [{
        label: '진료 과별 전문의 수',
        data: depData,
        backgroundColor: [
          depData[0].color,
          depData[1].color,
          depData[2].color
        ],
        borderColor: [
          depData[0].color,
          depData[1].color,
          depData[2].color
        ],
        borderWidth: 2
      }]
    };

   // resetButton plugin
    const resetButton = {
      id : 'resetButton',
      beforeDraw(chart, args, options){
        if(myChart.config.data.datasets[0].label !== '진료 과별 전문의 수'){

            const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
            ctx.save();

            const text = 'Back';
            const thickBorder = 3;
            const textWidth = ctx.measureText(text).width;

            // draw background
            ctx.fillStyle = 'rgba(255, 28, 239, 0.21)';
            ctx.fillRect(right - (textWidth + 1 + 10), 5, textWidth + 10 , 20)

            // draw text
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.fillText(text,right - (textWidth + 1 + 5), 15);


            // draw border
            ctx.lineWidth = thickBorder + 'px';
            ctx.strokeStyle = 'rgba(255,26,104,1)';
            ctx.strokeRect(right - (textWidth + 1 + 10), 5, textWidth + 10 , 20);

            console.log(coordinates)
            coordinates.top = 5;
            coordinates.bottom = 25;
            coordinates.left = right - (textWidth + 1 + 10);
            coordinates.right = right - textWidth;

            ctx.restore();
        };
      }
    }



    // config
    const config = {
      type: 'bar',
      data,
      options: {
        plugins : {
          tooltip : {
            yAlign : 'bottom'
          }
        },
        onHover: (event, chartElement) => {
            if(myChart.config.data.datasets[0].label === '진료 과별 전문의 수')
            {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        } else {
            event.native.target.style.cursor = 'default';
        };
      },
        parsing: {
            xAxisKey: 'dep',
            yAxisKey: 'count'
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      plugins : [resetButton]
    };

    // render init block
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(
      ctx,
      config
    );

    function changeChart(dep){

        myChart.config.options.parsing.xAxisKey = 'doctorData.depart';
        myChart.config.options.parsing.yAxisKey = 'doctorData.doctors';

        const vColor = [];
        const vUsers = [];
        const vLabels = depData[dep].doctorData.map(labels => {
            vColor.push(depData[dep].color);
            vUsers.push(labels.doctors);
            return labels.depart;
        })
        console.log(vLabels)
        myChart.config.data.datasets[0].data = vUsers;
        myChart.config.data.labels = vLabels;
        myChart.config.data.datasets[0].backgroundColor = vColor;
        myChart.config.data.datasets[0].borderColor = vColor;
        myChart.config.data.datasets[0].label = depData[dep].dep;
        myChart.update();
    }

    function clickHandler(click){
        if (myChart.config.data.datasets[0].label === '진료 과별 전문의 수'){

        const bar = myChart.getElementsAtEventForMode(click, 'nearest',
            {intersect: true}, true);
        console.log(bar);
        if(bar.length){
            console.log(bar[0].index);
            changeChart(bar[0].index);
        }
      }
    };


    function resetChart(){
      console.log('clicked reset button!');
      myChart.config.options.parsing.xAxisKey = 'dep';
      myChart.config.options.parsing.yAxisKey = 'count';

      const bColor = [];
      const bMarketshare = [];
      const bLabels = depData.map(dep => {
        bColor.push(dep.color);
        bMarketshare.push(dep.count);
        return dep.dep;
      });

      myChart.config.data.datasets[0].backgroundColor = bColor;
      myChart.config.data.datasets[0].borderColor = bColor;
      myChart.config.data.labels = bLabels;
      myChart.config.data.datasets[0].label = '진료 과별 전문의 수';
      myChart.config.data.datasets[0].data = bMarketshare;

      myChart.update();
    };


    function mousemoveHandler(canvas, mousemove ) {
      const x = mousemove.offsetX;
      const y = mousemove.offsetY;

      if(myChart.config.data.datasets[0].label !== '진료 과별 전문의 수'){
          if ( x > coordinates.left && x < coordinates.right && y > coordinates.top && y
               < coordinates.bottom){
                canvas.style.cursor = 'pointer';
               } else {
                canvas.style.cursor = 'default';
              };
          };
      };


    function clickButtonHandler(canvas, click){
      const x = click.offsetX;
      const y = click.offsetY;

      if (x > coordinates.left && x < coordinates.right && y > coordinates.top && y
          < coordinates.bottom){
            resetChart();
          };
    }

    ctx.onclick = clickHandler;

    ctx.addEventListener('mousemove', (e) => {
      myChart.resize();
      mousemoveHandler(ctx, e);
    });

    ctx.addEventListener('click', (e) => {
      myChart.resize();
      clickButtonHandler(ctx,e);
    })




/*
const Data = [
            {
                dep: '종합병원',
                color: 'rgba(0, 123, 255, 0.5)',
                count: 1800,
                depData : [
                        {   dep1: '내과계',
                          count1: {{ doctor.22.sum|add:doctor.1.sum|add:doctor.11.sum|add:doctor.2.sum|add:doctor.3.sum|add:doctor.20.sum|add:doctor.14.sum }},
                       doctorData: [
                                { depart : '{{ doctor.22.department }}', doctors: {{ doctor.22.sum }} },
                                { depart : '{{ doctor.1.department }}', doctors: {{ doctor.1.sum }} },
                                { depart : '{{ doctor.11.department }}', doctors: {{ doctor.11.sum }} },
                                { depart : '{{ doctor.2.department }}', doctors: {{ doctor.2.sum }} },
                                { depart : '{{ doctor.3.department }}', doctors: {{ doctor.3.sum }} },
                                { depart : '{{ doctor.20.department }}', doctors: {{ doctor.20.sum }} },
                                { depart : '{{ doctor.14.department }}', doctors: {{ doctor.14.sum }} }
                            ] },

                        {
                           dep1: '외과계',

                            count1: {{ doctor.15.sum|add:doctor.10.sum|add:doctor.8.sum|add:doctor.6.sum|add:doctor.7.sum|add:doctor.12.sum|add:doctor.4.sum|add:doctor.13.sum|add:doctor.5.sum }},
                           doctorData: [
                                { depart : '{{ doctor.15.department }}', doctors: {{ doctor.15.sum }} },
                                { depart : '{{ doctor.10.department }}', doctors: {{ doctor.10.sum }} },
                                { depart : '{{ doctor.8.department }}', doctors: {{ doctor.8.sum }} },
                                { depart : '{{ doctor.6.department }}', doctors: {{ doctor.6.sum }} },
                                { depart : '{{ doctor.7.department }}', doctors: {{ doctor.7.sum }} },
                                { depart : '{{ doctor.12.department }}', doctors: {{ doctor.12.sum }} },
                                { depart : '{{ doctor.4.department }}', doctors: {{ doctor.4.sum }} },
                                { depart : '{{ doctor.13.department }}', doctors: {{ doctor.13.sum }} },
                                { depart : '{{ doctor.5.department }}', doctors: {{ doctor.5.sum }} },
                                ] },

                        {
                       dep1: '지원계',
                       color1: 'rgba(0, 123, 255, 0.5)',
                       count1: {{ doctor.9.sum|add:doctor.17.sum|add:doctor.18.sum|add:doctor.16.sum|add:doctor.23.sum|add:doctor.24.sum|add:doctor.19.sum|add:doctor.21.sum }},
                       doctorData: [
                            { depart : '{{ doctor.9.department }}', doctors: {{ doctor.9.sum }} },
                            { depart : '{{ doctor.17.department }}', doctors: {{ doctor.17.sum }} },
                            { depart : '{{ doctor.18.department }}', doctors: {{ doctor.18.sum }} },
                            { depart : '{{ doctor.16.department }}', doctors: {{ doctor.16.sum }} },
                            { depart : '{{ doctor.23.department }}', doctors: {{ doctor.23.sum }} },
                            { depart : '{{ doctor.24.department }}', doctors: {{ doctor.24.sum }} },
                            { depart : '{{ doctor.19.department }}', doctors: {{ doctor.19.sum }} },
                            { depart : '{{ doctor.21.department }}', doctors: {{ doctor.21.sum }} },

                                ]
                            }
                ]
            }
            ,
            {
                dep: '병원',
                color: 'rgba(0, 123, 255, 0.5)',
                count: 500,
            depData : [
            {   dep1: '내과계',
                  count1: {{ doctor.22.sum|add:doctor.1.sum|add:doctor.11.sum|add:doctor.2.sum|add:doctor.3.sum|add:doctor.20.sum|add:doctor.14.sum }},
               doctorData: [
                        { depart : '{{ doctor.22.department }}', doctors: {{ doctor.22.sum }} },
                        { depart : '{{ doctor.1.department }}', doctors: {{ doctor.1.sum }} },
                        { depart : '{{ doctor.11.department }}', doctors: {{ doctor.11.sum }} },
                        { depart : '{{ doctor.2.department }}', doctors: {{ doctor.2.sum }} },
                        { depart : '{{ doctor.3.department }}', doctors: {{ doctor.3.sum }} },
                        { depart : '{{ doctor.20.department }}', doctors: {{ doctor.20.sum }} },
                        { depart : '{{ doctor.14.department }}', doctors: {{ doctor.14.sum }} }
                    ] },

                {
               dep1: '외과계',
               color1: 'rgba(0, 123, 255, 0.5)',
                count1: {{ doctor.15.sum|add:doctor.10.sum|add:doctor.8.sum|add:doctor.6.sum|add:doctor.7.sum|add:doctor.12.sum|add:doctor.4.sum|add:doctor.13.sum|add:doctor.5.sum }},
               doctorData: [
                    { depart : '{{ doctor.15.department }}', doctors: {{ doctor.15.sum }} },
                    { depart : '{{ doctor.10.department }}', doctors: {{ doctor.10.sum }} },
                    { depart : '{{ doctor.8.department }}', doctors: {{ doctor.8.sum }} },
                    { depart : '{{ doctor.6.department }}', doctors: {{ doctor.6.sum }} },
                    { depart : '{{ doctor.7.department }}', doctors: {{ doctor.7.sum }} },
                    { depart : '{{ doctor.12.department }}', doctors: {{ doctor.12.sum }} },
                    { depart : '{{ doctor.4.department }}', doctors: {{ doctor.4.sum }} },
                    { depart : '{{ doctor.13.department }}', doctors: {{ doctor.13.sum }} },
                    { depart : '{{ doctor.5.department }}', doctors: {{ doctor.5.sum }} },
                    ] },

                {
               dep1: '지원계',
               color1: 'rgba(0, 123, 255, 0.5)',
               count1: {{ doctor.9.sum|add:doctor.17.sum|add:doctor.18.sum|add:doctor.16.sum|add:doctor.23.sum|add:doctor.24.sum|add:doctor.19.sum|add:doctor.21.sum }},
               doctorData: [
                    { depart : '{{ doctor.9.department }}', doctors: {{ doctor.9.sum }} },
                    { depart : '{{ doctor.17.department }}', doctors: {{ doctor.17.sum }} },
                    { depart : '{{ doctor.18.department }}', doctors: {{ doctor.18.sum }} },
                    { depart : '{{ doctor.16.department }}', doctors: {{ doctor.16.sum }} },
                    { depart : '{{ doctor.23.department }}', doctors: {{ doctor.23.sum }} },
                    { depart : '{{ doctor.24.department }}', doctors: {{ doctor.24.sum }} },
                    { depart : '{{ doctor.19.department }}', doctors: {{ doctor.19.sum }} },
                    { depart : '{{ doctor.21.department }}', doctors: {{ doctor.21.sum }} },

                        ]
                    }
                ]
            },
            {
                dep: '의원',
                color: 'rgba(0, 123, 255, 0.5)',
                count: 1000,
            depData : [
            {   dep1: '내과계',
                  count1: {{ doctor.22.sum|add:doctor.1.sum|add:doctor.11.sum|add:doctor.2.sum|add:doctor.3.sum|add:doctor.20.sum|add:doctor.14.sum }},
               doctorData: [
                        { depart : '{{ doctor.22.department }}', doctors: {{ doctor.22.sum }} },
                        { depart : '{{ doctor.1.department }}', doctors: {{ doctor.1.sum }} },
                        { depart : '{{ doctor.11.department }}', doctors: {{ doctor.11.sum }} },
                        { depart : '{{ doctor.2.department }}', doctors: {{ doctor.2.sum }} },
                        { depart : '{{ doctor.3.department }}', doctors: {{ doctor.3.sum }} },
                        { depart : '{{ doctor.20.department }}', doctors: {{ doctor.20.sum }} },
                        { depart : '{{ doctor.14.department }}', doctors: {{ doctor.14.sum }} }
                    ] },

                {
               dep1: '외과계',
               color1: 'rgba(0, 123, 255, 0.5)',
                count1: {{ doctor.15.sum|add:doctor.10.sum|add:doctor.8.sum|add:doctor.6.sum|add:doctor.7.sum|add:doctor.12.sum|add:doctor.4.sum|add:doctor.13.sum|add:doctor.5.sum }},
               doctorData: [
                    { depart : '{{ doctor.15.department }}', doctors: {{ doctor.15.sum }} },
                    { depart : '{{ doctor.10.department }}', doctors: {{ doctor.10.sum }} },
                    { depart : '{{ doctor.8.department }}', doctors: {{ doctor.8.sum }} },
                    { depart : '{{ doctor.6.department }}', doctors: {{ doctor.6.sum }} },
                    { depart : '{{ doctor.7.department }}', doctors: {{ doctor.7.sum }} },
                    { depart : '{{ doctor.12.department }}', doctors: {{ doctor.12.sum }} },
                    { depart : '{{ doctor.4.department }}', doctors: {{ doctor.4.sum }} },
                    { depart : '{{ doctor.13.department }}', doctors: {{ doctor.13.sum }} },
                    { depart : '{{ doctor.5.department }}', doctors: {{ doctor.5.sum }} },
                    ] },

                {
               dep1: '지원계',
               color1: 'rgba(0, 123, 255, 0.5)',
               count1: {{ doctor.9.sum|add:doctor.17.sum|add:doctor.18.sum|add:doctor.16.sum|add:doctor.23.sum|add:doctor.24.sum|add:doctor.19.sum|add:doctor.21.sum }},
               doctorData: [
                    { depart : '{{ doctor.9.department }}', doctors: {{ doctor.9.sum }} },
                    { depart : '{{ doctor.17.department }}', doctors: {{ doctor.17.sum }} },
                    { depart : '{{ doctor.18.department }}', doctors: {{ doctor.18.sum }} },
                    { depart : '{{ doctor.16.department }}', doctors: {{ doctor.16.sum }} },
                    { depart : '{{ doctor.23.department }}', doctors: {{ doctor.23.sum }} },
                    { depart : '{{ doctor.24.department }}', doctors: {{ doctor.24.sum }} },
                    { depart : '{{ doctor.19.department }}', doctors: {{ doctor.19.sum }} },
                    { depart : '{{ doctor.21.department }}', doctors: {{ doctor.21.sum }} },

                        ]
                    }
                ]
            }
        ];
*/