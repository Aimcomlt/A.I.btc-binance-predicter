

const initalState = {
    Loading: false,
    dataB: {
      labels: [],
      datasets: [{
        type: 'radar',
        label: "BOT CHART PREDICTION",
        data: [],
        backgroundColor: 'rgba(226, 153, 18, 0.9)',
        borderColor: 'rgba(178, 116, 0, 1)',
        pointBorderColor: 'rgba(25, 16, 0, 1)',
        options: {
          responsive: true
        }
      }]
    },
    dataC: {
      labels: [],
      datasets: [{
        type: 'bar',
        label: "BOT CHART PREDICTION",
        data: [],
        backgroundColor: 'rgba(226, 153, 18, 0.9)',
        borderColor: 'rgba(178, 116, 0, 1)',
        pointBorderColor: 'rgba(25, 16, 0, 1)',
        options: {
          responsive: true
        }
      }]
    },
    dataD: {
        labels: [],
        datasets: [{
          type: 'line',
          label: "Real Time vs Open Prediction",
          data: [],
          backgroundColor: 'rgba(226, 153, 18, 0.9)',
          borderColor: 'rgba(178, 116, 0, 1)',
          pointBorderColor: 'rgba(25, 16, 0, 1)',
          options: {
            scales: {
                x: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
        }],
      },
      dataF: {
        labels: [],
        datasets: [{
          type: 'line',
          label: "BOT CHART PREDICTION",
          data: [],
          backgroundColor: 'rgba(226, 153, 18, 0.9)',
          borderColor: 'rgba(178, 116, 0, 1)',
          pointBorderColor: 'rgba(25, 16, 0, 1)',
          options: {
            responsive: true
          }
        }],
        
      },
      dataG: {
        labels: [],
        datasets: [{
          type: 'line',
          label: "BOT CHART PREDICTION",
          data: [],
          backgroundColor: 'rgba(226, 153, 18, 0.9)',
          borderColor: 'rgba(178, 116, 0, 1)',
          pointBorderColor: 'rgba(25, 16, 0, 1)',
          options: {
            responsive: true
          }
        }],
        
      },  

}
const brainReducer = (state = initalState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "AWAITING_BITCOIN":
          return {
            ...state,
            loading: true
          }
        case "REJECTED_BITCOIN":
          return {
            ...state,
            loading: false,
          }
        case "SUCCESS_BITCOIN":

            return {
                ...state,
                loading: false,
                dataB: {
                  labels: payload.epoxResult,
                  datasets: [
                    {
                    type: 'line',
                    label: "OPEN PRICE FROM SECONDARY LAYER",
                    data: payload.LayerIIOpenResult,
                    backgroundColor: 'rgba(255, 0, 0, 0.4)',
                    borderColor: '	rgba(255, 0, 0, 0.9)',
                    pointBorderColor: 'rgba(25, 16, 0, 1)',
        
                    order: 1
                    },
                    {
                      type: 'line',
                      label: "HIGH PRICE FROM SECONDARY LAYER",
                      data: payload.LayerIIHighResult, 
                      backgroundColor:'rgba(0,0,255, 0.7)',
                      borderColor: 'rgba(0,0,255, 0.9)',
                      pointBorderColor: 'rgba(0,0,255, 0.8)',
          
                      order: 2
                      },
                      {
                        type: 'line',
                        label: "LOW PRICE FROM SECONDARY LAYER",
                        data: payload.LayerIILowResult,
                        backgroundColor:'rgba(255,255,0, 0.8)',
                        borderColor: 'rgba(255,255,0, 0.9)',
                        pointBorderColor: 'rgba(255,255,0, 0.9)',
            
                        order: 3
                        },
                    {
                    type: 'line',
                    label: "CLOSE PRICE FROM SECONDARY LAYER",
                    data: payload.LayerIICloseResult,
                    backgroundColor:'rgba(10, 204, 0, 0.7)',
                    borderColor: 'rgba(10, 204, 0, 0.9)',
                    pointBorderColor: 'rgba(10, 204, 0, 0.7)',
        
                    order: 4
                    }
                  ]
                  },
                dataD: {
                      labels: payload.epoxResult,
                      datasets: [{
                        type: "line",
                        label: "BTC OPEN PRICE" ,
                        data: payload.openPriceResult,                        
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        pointBorderColor: 'rgba(0, 0, 0 , 0.8)',
                        order: 1,
                      },
                      {
                        type: "line",
                        label: "BTC CLOSE PRICE" ,
                        data: payload.closePriceResult,                        
                        backgroundColor: 'rgba(3, 3, 3, 0.6)',
                        borderColor: 'rgba(0, 0, 0, 0.8)',
                        pointBorderColor: 'rgba(0, 0, 0 , 0.8)',
                        order: 1,
                      },

                      {
                        type: 'line',
                        label: "PREDICTED OPEN",
                        data: payload.OpenBrainResulta,
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        borderColor: 'rgba(255, 0, 0, 0.9)',
                        pointBorderColor: 'rgba(25, 16, 0, 1)',
                        order: 5,
                      },
                      {
                        type: 'line',
                        label: "PREDICTED CLOSE",
                        data: payload.CloseBrainResult,
                        backgroundColor: 'rgba(0,0,255, 0.4)',
                        borderColor: '	rgba(0,0,255, 0.9)',
                        pointBorderColor: 'rgba(0,0,255, 1)',
                        order: 4,
                      },
                      {
                        type: 'line',
                        label: "PREDICTED HIGH",
                        data: payload.HighBrainResult,
                        backgroundColor: 'rgba(22, 91, 160, 0.7)',
                        borderColor: '	rgba(22, 91, 160, 0.9)',
                        pointBorderColor: 'rgba(22, 91, 160, 1)',
                        order: 6,
                      },
                      {
                        type: 'line',
                        label: "PREDICTED LOW",
                        data: payload.LowBrainResult,
                        backgroundColor: 'rgba(255, 255, 0, 0.7)',
                        borderColor: 'rgba(255, 255, 0, 0.9)',
                        pointBorderColor: 'rgba(255, 255, 0, 1)',
                        order: 7,
                      },
                      {
                        type: 'line',
                        label: "All 4 PREDICTED MOVING AVERAGE",
                        data: payload.midOP,
                        backgroundColor: 'rgba(255, 113, 16, 0.7)',
                        borderColor: 'rgba(255, 113, 16, 0.9)',
                        pointBorderColor: 'rgba(255, 113, 16, 0.9)',
                        order: 8,
                      },
                      {
                        type: 'line',
                        label: "AVERAGE OPEN MARKET VS PREDICTED",
                        data: payload.Elem1,
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        borderColor: 'rgba(255, 0, 0, 0.9)',
                        pointBorderColor: 'rgba(25, 16, 0, 1)',
                        order: 9,
                      },
                      {
                        type: 'line',
                        label: "AVERAGE HIGH MARKET VS PREDICTED",
                        data: payload.Elem2,
                        backgroundColor: 'rgba(22, 91, 160, 0.7)',
                        borderColor: '	rgba(22, 91, 160, 0.9)',
                        pointBorderColor: 'rgba(22, 91, 160, 1)',
                        order: 10,
                      },
                      {
                        type: 'line',
                        label: "AVERAGE LOW MARKET VS PREDICTED",
                        data: payload.Elem3,
                        backgroundColor: 'rgba(255, 255, 0, 0.7)',
                        borderColor: 'rgba(255, 255, 0, 0.9)',
                        pointBorderColor: 'rgba(255, 255, 0, 1)',
                        order: 11,
                      },
                      {
                        type: 'line',
                        label: "AVERAGE CLOSE MARKET VS PREDICTED",
                        data: payload.Elem4,
                        backgroundColor: 'rgba(0,0,255, 0.4)',
                        borderColor: '	rgba(0,0,255, 0.9)',
                        pointBorderColor: 'rgba(0,0,255, 1)',
                        order: 12,
                      },
                    ]
                  },
                  dataC: {
                    labels:payload.epoxResult,
                    datasets: [
                    /*  {
                      type: 'bar',
                      label: "Real Time vs Predicted Open ",
                      data: payload.Elem1,
                      backgroundColor: 'rgba(255, 0, 0, 0.4)',
                      borderColor: 'rgba(255, 0, 0, 0.9)',
                      pointBorderColor: 'rgba(25, 16, 0, 1)',
                      order: 1
                      },            
                      {
                      type: 'bar',
                      label: "HIGH PRICE VS PREDICTED A.I. PRICE",
                      data: payload.Elem2,
                      backgroundColor: 'rgba(22, 91, 160, 0.7)',
                      borderColor: '	rgba(22, 91, 160, 0.9)',
                      pointBorderColor: 'rgba(22, 91, 160, 1)',
                      order: 2
                      },
                      {
                      type: 'bar',
                      label: "LOW PRICE VS PREDICTED A.I. PRICE",
                      data: payload.Elem3,
                      backgroundColor: 'rgba(255, 255, 0, 0.7)',
                      borderColor: 'rgba(255, 255, 0, 0.9)',
                      pointBorderColor: 'rgba(255, 255, 0, 1)',
                      order: 3
                      },
                      {
                      type: 'bar',
                      label: "CLOSE PRICE VS PREDICTED A.I. PRICE",
                      data: payload.Elem4,
                      backgroundColor: 'rgba(0,0,255, 0.4)',
                      borderColor: '	rgba(0,0,255, 0.9)',
                      pointBorderColor: 'rgba(0,0,255, 1)',
                      order: 4
                      },
                      {
                        type: 'bar',
                        label: "All 4 PREDICTED MOVING AVERAGE",
                        data: payload.midOP,
                        backgroundColor: 'rgba(255, 113, 16, 0.7)',
                        borderColor: 'rgba(255, 113, 16, 0.9)',
                        pointBorderColor: 'rgba(255, 113, 16, 0.9)',
                        order: 5,
                      },
                      {
                        type: 'bar',
                        label: "RE-AQUIERED OPEN TARKET PRICE",
                        data: payload.LayerIIOpenResult,
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        borderColor: '	rgba(255, 0, 0, 0.9)',
                        pointBorderColor: 'rgba(25, 16, 0, 1)',
                        order: 6,
                      },
                      {
                        type: 'bar',
                        label: "RE-AQUIERED CLOSE TARKET PRICE",
                        data: payload.LayerIICloseResult,
                        backgroundColor:'rgba(10, 204, 0, 0.7)',
                        borderColor: 'rgba(10, 204, 0, 0.9)',
                        pointBorderColor: 'rgba(10, 204, 0, 0.7)',
                        order: 7,
                      },
                      {
                        type: 'bar',
                        label: "LOW PRICE FROM SECONDARY LAYER",
                        data: payload.LayerIILowResult,
                        backgroundColor:'rgba(255,255,0, 0.8)',
                        borderColor: 'rgba(255,255,0, 0.9)',
                        pointBorderColor: 'rgba(255,255,0, 0.9)',
            
                        order: 8,
                        },
                        {
                          type: 'bar',
                          label: "CLOSE PRICE FROM SECONDARY LAYER",
                          data: payload.LayerIICloseResult,
                          backgroundColor: 'rgba(22, 91, 160, 0.7)',
                          borderColor: '	rgba(22, 91, 160, 0.9)',
                          pointBorderColor: 'rgba(22, 91, 160, 1)',
              
                          order: 9,
                          },
                      */
                      {
                      type: 'line',
                      label: "WIDTH VALUE OF NEURAL NETWORK HIGH AND LOW",
                      data: payload.mouthSize,
                      backgroundColor: 'rgba(22, 91, 160, 0.7)',
                      borderColor: '	rgba(22, 91, 160, 0.9)',
                      pointBorderColor: 'rgba(22, 91, 160, 1)',
                      order: 1
                      },
                      {
                        type: 'line',
                        label: "VALUE OF NEURAL NETWORK HIGH VS MARKET LATESS HIGH",
                        data: payload.mouthCeilingSize,
                        backgroundColor: 'rgba(22, 91, 160, 0.7)',
                        borderColor: 'rgba(200,100,0, 0.9)',
                        pointBorderColor: 'rgba(200,100,0, 0.9)',
                        order: 2
                        },
                        {
                          type: 'line',
                          label: "WIDTH VALUE OF NEURAL NETWORK LOW VS LATESS LOW",
                          data: payload.mouthFloorSize,
                          backgroundColor:'rgba(255,55,0, 0.8)',
                          borderColor: 'rgba(255,55,0, 0.9)',
                          pointBorderColor: 'rgba(220,55,0, 0.9)',
                          order: 3
                          },
                      {
                        type: 'line',
                        label: "WIDTH VALUE OF MARKET HIGH AND LOW",
                        data: payload.TongueSize,
                        backgroundColor:'rgba(255,255,0, 0.8)',
                        borderColor: 'rgba(255,255,0, 0.9)',
                        pointBorderColor: 'rgba(255,255,0, 0.9)',
                        order: 4
                        },
                      /*
                      {
                      type: 'bar',
                      label: "Predicted High vs Real High",
                      data: payload.HghPredicted,
                      backgroundColor: 'rgba(22, 91, 160, 0.9)', //blue
                      borderColor: 'rgba(22, 91, 160, 0.9)',
                      pointBorderColor: 'rgba(22, 91, 160, 0.9)',
                      order: 6
                      },
                      {
                      type: 'bar',
                      label: "Real Low vs Predicted Low",
                      data: payload.RealLow,
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      borderColor: 'rgba(0, 0, 0, 0.9)',
                      pointBorderColor: 'rgba(0, 0, 0, 0.9)',
                      order: 7
                      },
                      {
                      type: 'bar',
                      label: "Predicted Low vs Real Low",
                      data: payload.LowPredicted,
                      backgroundColor: 'rgba(255, 255, 0, 0.9)',
                      borderColor: 'rgba(255, 255, 0, 0.9)',
                      pointBorderColor: 'rgba(255, 255, 0, 0.9)',
                      order: 8
                      }*/
                    ]
                   },
                   dataF: {
                    labels:payload.epoxResult,
                    datasets: [
                     {
                      type: 'line',
                      label: "Real Time vs Predicted Open ",
                      data: payload.Elem1,
                      backgroundColor: 'rgba(255, 0, 0, 0.4)',
                      borderColor: 'rgba(255, 0, 0, 0.9)',
                      pointBorderColor: 'rgba(25, 16, 0, 1)',
                      order: 1
                      },            
                      {
                      type: 'line',
                      label: "HIGH PRICE VS PREDICTED A.I. PRICE",
                      data: payload.Elem2,
                      backgroundColor: 'rgba(22, 91, 160, 0.7)',
                      borderColor: '	rgba(22, 91, 160, 0.9)',
                      pointBorderColor: 'rgba(22, 91, 160, 1)',
                      order: 2
                      },
                      {
                      type: 'line',
                      label: "LOW PRICE VS PREDICTED A.I. PRICE",
                      data: payload.Elem3,
                      backgroundColor: 'rgba(255, 255, 0, 0.7)',
                      borderColor: 'rgba(255, 255, 0, 0.9)',
                      pointBorderColor: 'rgba(255, 255, 0, 1)',
                      order: 3
                      },
                      {
                      type: 'line',
                      label: "CLOSE PRICE VS PREDICTED A.I. PRICE",
                      data: payload.Elem4,
                      backgroundColor: 'rgba(0,0,255, 0.4)',
                      borderColor: '	rgba(0,0,255, 0.9)',
                      pointBorderColor: 'rgba(0,0,255, 1)',
                      order: 4
                      },
                      
                      {
                        type: 'line',
                        label: "All 4 PREDICTED MOVING AVERAGE",
                        data: payload.midOP,
                        backgroundColor: 'rgba(255, 113, 16, 0.7)',
                        borderColor: 'rgba(255, 113, 16, 0.9)',
                        pointBorderColor: 'rgba(255, 113, 16, 0.9)',
                        order: 5,
                      },
                      /*
                      {
                        type: 'line',
                        label: "RE-AQUIERED OPEN TARKET PRICE",
                        data: payload.LayerIIOpenResult,
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        borderColor: '	rgba(255, 0, 0, 0.9)',
                        pointBorderColor: 'rgba(25, 16, 0, 1)',
                        order: 6,
                      },
                      {
                        type: 'line',
                        label: "RE-AQUIERED CLOSE TARKET PRICE",
                        data: payload.LayerIICloseResult,
                        backgroundColor:'rgba(10, 204, 0, 0.7)',
                        borderColor: 'rgba(10, 204, 0, 0.9)',
                        pointBorderColor: 'rgba(10, 204, 0, 0.7)',
                        order: 7,
                      },
                      {
                        type: 'line',
                        label: "LOW PRICE FROM SECONDARY LAYER",
                        data: payload.LayerIILowResult,
                        backgroundColor:'rgba(255,255,0, 0.8)',
                        borderColor: 'rgba(255,255,0, 0.9)',
                        pointBorderColor: 'rgba(255,255,0, 0.9)',
            
                        order: 8,
                        },
                        {
                          type: 'line',
                          label: "CLOSE PRICE FROM SECONDARY LAYER",
                          data: payload.LayerIICloseResult,
                          backgroundColor: 'rgba(22, 91, 160, 0.7)',
                          borderColor: '	rgba(22, 91, 160, 0.9)',
                          pointBorderColor: 'rgba(22, 91, 160, 1)',
              
                          order: 9,
                        }
                        */
                    ]
                  },   
                  
                  dataG: {
                    labels:payload.epoxResult,
                    datasets: [
                   /*  {
                      type: 'line',
                      label: "(Latess open + neural N open * 0.5) - neural N open",
                      data: payload.BrOpToNewOp,
                      backgroundColor: 'rgba(255, 0, 0, 0.4)',
                      borderColor: 'rgba(255, 0, 0, 0.9)',
                      pointBorderColor: 'rgba(25, 16, 0, 1)',
                      order: 1
                      },            
                      {
                      type: 'line',
                      label: "(Latess high + neural N high * 0.5) - neural N high",
                      data: payload.BrHgToNewHg,
                      backgroundColor: 'rgba(22, 91, 160, 0.7)',
                      borderColor: '	rgba(22, 91, 160, 0.9)',
                      pointBorderColor: 'rgba(22, 91, 160, 1)',
                      order: 2
                      },
                      {
                      type: 'line',
                      label: "(Latess low + neural N low * 0.5) - neural N low",
                      data: payload.BrLwToNewLw,
                      backgroundColor: 'rgba(255, 255, 0, 0.7)',
                      borderColor: 'rgba(255, 255, 0, 0.9)',
                      pointBorderColor: 'rgba(255, 255, 0, 1)',
                      order: 3
                      },
                      {
                      type: 'line',
                      label: "(Latess close + neural N close * 0.5) - neural N close",
                      data: payload.BrClToNewCl,
                      backgroundColor: 'rgba(0,0,255, 0.4)',
                      borderColor: '	rgba(0,0,255, 0.9)',
                      pointBorderColor: 'rgba(0,0,255, 1)',
                      order: 4
                      },*/
                      {
                        type: 'line',
                        label: "LATESS OPEN PRICE ABOVE OR BELOW ELEM-1",
                        data: payload.OpenMomentumX,
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        borderColor: 'rgba(255, 0, 0, 0.9)',
                        pointBorderColor: 'rgba(25, 16, 0, 1)',
                        order: 5
                        },            
                        {
                        type: 'line',
                        label: "LATESS HIGH PRICE ABOVE OR BELOW ELEM-2",
                        data: payload.HighMomentumX,
                        backgroundColor: 'rgba(22, 91, 160, 0.7)',
                        borderColor: '	rgba(22, 91, 160, 0.9)',
                        pointBorderColor: 'rgba(22, 91, 160, 1)',
                        order: 6
                        },
                        {
                        type: 'line',
                        label: "LATESS LOW PRICE ABOVE OR BELOW ELEM-3",
                        data: payload.LowMomentumX,
                        backgroundColor: 'rgba(255, 255, 0, 0.7)',
                        borderColor: 'rgba(255, 255, 0, 0.9)',
                        pointBorderColor: 'rgba(255, 255, 0, 1)',
                        order: 7
                        },
                        {
                        type: 'line',
                        label: "LATESS CLOSE PRICE ABOVE OR BELOW ELEM-4",
                        data: payload.CloseMomentumX,
                        backgroundColor: 'rgba(0,0,255, 0.4)',
                        borderColor: '	rgba(0,0,255, 0.9)',
                        pointBorderColor: 'rgba(0,0,255, 1)',
                        order: 8
                        },
                        {
                          type: 'line',
                          label: "OPEN VS MOMENTUM ",
                          data: payload.OpenVsMomentum,
                          backgroundColor: 'rgba(255, 0, 0, 0.4)',
                          borderColor: 'rgba(255, 50, 0, 0.9)',
                          pointBorderColor: 'rgba(25, 16, 0, 1)',
                          order: 9
                          },            
                          {
                          type: 'line',
                          label: "HIGH VS MOMENTUM",
                          data: payload.HighVsMomentum,
                          backgroundColor: 'rgba(22, 91, 160, 0.7)',
                          borderColor: '	rgba(22, 41, 160, 0.9)',
                          pointBorderColor: 'rgba(22, 91, 160, 1)',
                          order: 10
                          },
                          {
                          type: 'line',
                          label: "LOW VS MOMENTUM",
                          data: payload.LowVsMomentum,
                          backgroundColor: 'rgba(255, 255, 0, 0.7)',
                          borderColor: 'rgba(255, 41, 0, 0.9)',
                          pointBorderColor: 'rgba(255, 255, 0, 1)',
                          order: 11
                          },
                          {
                          type: 'line',
                          label: "CLOSE VS MOMENTUM",
                          data: payload.CloseVsMomentum,
                          backgroundColor: 'rgba(0,0,255, 0.4)',
                          borderColor: '	rgba(0,41,255, 0.9)',
                          pointBorderColor: 'rgba(0,0,255, 1)',
                          order: 12
                          },
                      /*
                      {
                        type: 'line',
                        label: "RE-AQUIERED OPEN TARKET PRICE",
                        data: payload.LayerIIOpenResult,
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        borderColor: '	rgba(255, 0, 0, 0.9)',
                        pointBorderColor: 'rgba(25, 16, 0, 1)',
                        order: 6,
                      },
                      {
                        type: 'line',
                        label: "RE-AQUIERED CLOSE TARKET PRICE",
                        data: payload.LayerIICloseResult,
                        backgroundColor:'rgba(10, 204, 0, 0.7)',
                        borderColor: 'rgba(10, 204, 0, 0.9)',
                        pointBorderColor: 'rgba(10, 204, 0, 0.7)',
                        order: 7,
                      },
                      {
                        type: 'line',
                        label: "LOW PRICE FROM SECONDARY LAYER",
                        data: payload.LayerIILowResult,
                        backgroundColor:'rgba(255,255,0, 0.8)',
                        borderColor: 'rgba(255,255,0, 0.9)',
                        pointBorderColor: 'rgba(255,255,0, 0.9)',
            
                        order: 8,
                        },
                        {
                          type: 'line',
                          label: "CLOSE PRICE FROM SECONDARY LAYER",
                          data: payload.LayerIICloseResult,
                          backgroundColor: 'rgba(22, 91, 160, 0.7)',
                          borderColor: '	rgba(22, 91, 160, 0.9)',
                          pointBorderColor: 'rgba(22, 91, 160, 1)',
              
                          order: 9,
                        }
                        */
                    ]
                  },
                    
                }
              
                 default: return state;
                }
             }
             export default brainReducer;
