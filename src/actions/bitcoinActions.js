import axios from "axios";
import brain from 'brain.js/src/index';

// INITIALIZING FOUR NEW NEURAL NETWORK INSTANCES 
const OpenPredictionBrain = new brain.NeuralNetwork();
const HighPredictionBrain = new brain.NeuralNetwork();
const LowPredictionBrain = new brain.NeuralNetwork();
const ClosePredictionBrain = new brain.NeuralNetwork();
//  INITIALIZING LAYER TWO NEURAL NETWORK INSTANCES
const OpenReAquiredTarget = new brain.NeuralNetwork();
const OpenReAquiredTargetHG = new brain.NeuralNetwork();
const OpenReAquiredTargetCL = new brain.NeuralNetwork();
const OpenReAquiredTargetLW = new brain.NeuralNetwork();

//const timeStamp = [];


//THE A.I. PREDICTION RESULT: INITIALIZING ARRAYS OHLC

const OpenBrainResulta = [];
const OpenBrainResultb = [];
const OpenBrainResultc = [];
const OpenBrainResultd = [];
const OpenBrainResulte = [];
const OpenBrainResultf = [];

const CloseBrainResult = [];
const HighBrainResult = [];
const LowBrainResult = [];
// LAYER TWO RE-AQUIRED TARGET PRICE OF ASSET OHLC
const LayerIIOpenResult = [];
const LayerIIHighResult = [];
const LayerIILowResult = [];
const LayerIICloseResult = [];
//some build up arrays
const mouthSize = []; //predicted high - predicted low = difference 
const mouthCeilingSize = []; //predicted high - latess market high = difference
const mouthFloorSize = []; // predicted low - latess market low = difference
const TongueSize = []; //latess market high - latess market low = difference 
const BrOpToNewOp = []; //brain open prediction vs elem1 = openPrediction + open LatesMarketPrice divide by 2 for average to scope for the difference between its self(the brain output) and a new element the latess data.This way the output can be re-used in theory into a new instance of a neural networks PS: All ways make sure that a latess data is added to any formula 
const BrHgToNewHg = [];
const BrLwToNewLw = [];
const BrClToNewCl = [];

const OpenMomentumX = [];
const HighMomentumX = [];
const LowMomentumX = [];
const CloseMomentumX = [];

const OpenVsMomentum = [];
const HighVsMomentum = [];
const LowVsMomentum = [];
const CloseVsMomentum = [];


//INITIALIZING ARRAYS FOR THE AXIOS GET FUNCTION 
    //const globalValueX = [];
    const globalLength = [];
    const epoxNum = [];
    const reponseXopen = [];
    const reponseXhigh = [];
    const reponseXlow = [];
    const reponseXclose = [];

export const getData = ({ time, number }) => async dispatch => {
  try {
    dispatch({
      type: "AWAITING_BITCOIN"
    })
 
  //THE ACTUAL IMPLEMENTATION OF THE AXIOS GET FUNCTION ***REMINDER BINANCE MAX CALL IS 500 
const responseA = await axios.get(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m`)
      for (let i = 0; i < (responseA.data.length); i++) {  
        globalLength.push(responseA.data.length)
        epoxNum.push(responseA.data[i][0]);
        reponseXopen.push(responseA.data[i][1]);
        reponseXhigh.push(responseA.data[i][2]);
        reponseXlow.push(responseA.data[i][3]);
        reponseXclose.push(responseA.data[i][4]);
       
      }
 const DataLength = epoxNum.length - 1;
   let valueX = reponseXopen.length - 1;

  
  
    //INITIALIZE SOME ARRAYS FOR TASKS

const ThePrice = [];
const HighPrice = [];
const LowPrice = [];
const ClosePrice = [];

console.log(epoxNum.length)
console.log(globalLength[0], 'ClosePrice: ', ClosePrice)

//THE TASKS TO PROPOGATE THE DATA FOR THOSE INITIAL ARRAYS 

      ThePrice.push(reponseXopen[valueX]);   
      HighPrice.push(reponseXhigh[valueX]);  
      LowPrice.push(reponseXlow[valueX]); 
      ClosePrice.push(reponseXclose[valueX]);


      console.log(ThePrice)
      console.log(HighPrice);
      console.log(LowPrice);
      console.log(ClosePrice);


// CONSOLE LOG ANY THING THAT MIGHT HELP YOU BUILD A BETTER FUTUR 
console.log(Date.now())
console.log('OPEN PRICE: ',reponseXopen[0], '-: ', reponseXopen[valueX]);
console.log('HIGH PRICE: ',reponseXhigh[0], '-: ', reponseXhigh[valueX]);
console.log('LOW PRICE: ',reponseXlow[0], '-: ', reponseXlow[valueX]);
console.log('CLOSE PRICE: ',reponseXclose[0], '-: ', reponseXclose[valueX]);
 
// INITIALIZING MORE ARRAYS FOR MORE TASKS 
    const labels = [];

    //THE CHART'S KLINE ARRAYS
    const open = [];
    const high = [];
    const low = [];
    const close = [];

//INITIALIZING MOVING AVERAGE ARRAYS
    const openMA = [];
    const highMA = [];
    const lowMA = [];
    const closeMA = [];

//TASK TO PROPOGATE THE KLINE DATA TO THE CHART
    for (let i = 0; i < (reponseXopen.length); i++) {
    
      highMA.push(reponseXhigh[i]) //For task check: this:)
      labels.push(epoxNum[i]) //For task check: this:)
      open.push(reponseXopen[i]) //For task check: this:)
      high.push(reponseXhigh[ i]) //For task check: this:)
      close.push(reponseXclose[i]) //For task check: this:)
      low.push(reponseXlow[i]) //For task check: this:) line...to be continued...


      openMA.push(reponseXopen[i])
      highMA.push(reponseXhigh[i])
      lowMA.push(reponseXlow[i])
      closeMA.push(reponseXclose[i])
      
             

      if (i === (number - 1)) {
        break;
      }
    }
 

////////////////////////////////******//BEGINING OF THE NEURAL NETWORK//*********

// THE OPEN PRICE NEURAL NETWORK PREDICTION BRAIN #1
    const CenterOpenBrain = [];
    for (let i = 0; i < reponseXopen.length; i++) {
    var a = i + 5;
    if (a > reponseXopen.length-1) { a = i };
    var b = i + 4;
    if (b > reponseXopen.length-1) { b = i };
    var c = i + 3;
    if (c > reponseXopen.length-1) { c = i };
    var d = i + 2;
    if (d > reponseXopen.length-1) { d = i };
    var f = i + 1;
    if (f > reponseXopen.length-1) { f = i };

      CenterOpenBrain.push({
		  input: {
			    hgha: reponseXhigh[a] * 0.00001,
          hghb: reponseXhigh[b] * 0.00001,
          hghc: reponseXhigh[c] * 0.00001,
          hghd: reponseXhigh[d] * 0.00001,
          hghe: reponseXhigh[f] * 0.00001,
          hghf: reponseXhigh[i] * 0.00001,
			     lwa: reponseXlow[a] * 0.00001,
           lwb: reponseXlow[b] * 0.00001,
           lwc: reponseXlow[c] * 0.00001,
           lwd: reponseXlow[d] * 0.00001,
           lwe: reponseXlow[f] * 0.00001,
           lwf: reponseXlow[i] * 0.00001,
			     cla: reponseXclose[a] * 0.00001,
           clb: reponseXclose[b] * 0.00001,
           clc: reponseXclose[c] * 0.00001,
           cld: reponseXclose[d] * 0.00001,
           cle: reponseXclose[f] * 0.00001,
           clf: reponseXclose[i] * 0.00001,
			      },
		  output: {
			  opa: reponseXopen[a] * 0.00001,
        opb: reponseXopen[b] * 0.00001,
        opc: reponseXopen[c] * 0.00001,
        opd: reponseXopen[d] * 0.00001,
        ope: reponseXopen[f] * 0.00001,
        opf: reponseXopen[i] * 0.00001,
					}
        })
      }
      console.log('BRAIN OPEN PRICE TRAINING ARRAY : ', CenterOpenBrain)

      OpenPredictionBrain.train(CenterOpenBrain, {
        iterations: 20500,
        errorThresh: 0.0005,
        log: false,
        learningRate: 0.3,
        momentum: 0.08
           });

           const CenterOpenResult = OpenPredictionBrain.run({

                   hgha: reponseXhigh[494] * 0.00001,
                   hghb: reponseXhigh[495] * 0.00001,
                   hghc: reponseXhigh[496] * 0.00001,
                   hghd: reponseXhigh[497] * 0.00001,
                   hghe: reponseXhigh[498] * 0.00001,
                   hghf: reponseXhigh[499] * 0.00001,
                    lwa: reponseXlow[494] * 0.00001,
                    lwb: reponseXlow[495] * 0.00001,
                    lwc: reponseXlow[496] * 0.00001,
                    lwd: reponseXlow[497] * 0.00001,
                    lwe: reponseXlow[498] * 0.00001,
                    lwf: reponseXlow[499] * 0.00001,
                    cla: reponseXclose[494] * 0.00001,
                    clb: reponseXclose[495] * 0.00001,
                    clc: reponseXclose[496] * 0.00001,
                    cld: reponseXclose[497] * 0.00001,
                    cle: reponseXclose[498] * 0.00001,
                    clf: reponseXclose[499] * 0.00001,
                    });

// THE HIGH PRICE NEURAL NETWORK PREDICTION BRAIN #2
                             const RightHighBrain = [];
                             for (let i = 0; i < reponseXhigh.length; i++) {

         
                               RightHighBrain.push({
                                input: {
                                  opa: reponseXopen[a] * 0.00001,
                                  opb: reponseXopen[b] * 0.00001,
                                  opc: reponseXopen[c] * 0.00001,
                                  opd: reponseXopen[d] * 0.00001,
                                  ope: reponseXopen[f] * 0.00001,
                                  opf: reponseXopen[i] * 0.00001,
                                   lwa: reponseXlow[a] * 0.00001,
                                   lwb: reponseXlow[b] * 0.00001,
                                   lwc: reponseXlow[c] * 0.00001,
                                   lwd: reponseXlow[d] * 0.00001,
                                   lwe: reponseXlow[f] * 0.00001,
                                   lwf: reponseXlow[i] * 0.00001,
                                   cla: reponseXclose[a] * 0.00001,
                                   clb: reponseXclose[b] * 0.00001,
                                   clc: reponseXclose[c] * 0.00001,
                                   cld: reponseXclose[d] * 0.00001,
                                   cle: reponseXclose[f] * 0.00001,
                                   clf: reponseXclose[i] * 0.00001,
                                    },
                              output: {
                                hgha: reponseXhigh[a] * 0.00001,
                                hghb: reponseXhigh[b] * 0.00001,
                                hghc: reponseXhigh[c] * 0.00001,
                                hghd: reponseXhigh[d] * 0.00001,
                                hghe: reponseXhigh[f] * 0.00001,
                                hghf: reponseXhigh[i] * 0.00001,
                                  }
                               })
                             }
                             console.log('BRAIN HIGH PRICE TRAINING ARRAY : ', RightHighBrain)
                      
                             HighPredictionBrain.train(RightHighBrain, {
                                 errorThresh: 0.0005,
                                 log: true, 
                                 learningRate: 0.3,
                                 momentum: 0.08
                                });
                                const RightHighResult = HighPredictionBrain.run({
         
                                  opa: reponseXopen[494] * 0.00001,
                                  opb: reponseXopen[495] * 0.00001,
                                  opc: reponseXopen[496] * 0.00001,
                                  opd: reponseXopen[497] * 0.00001,
                                  ope: reponseXopen[498] * 0.00001,
                                  opf: reponseXopen[499] * 0.00001,
                                   lwa: reponseXlow[494] * 0.00001,
                                   lwb: reponseXlow[495] * 0.00001,
                                   lwc: reponseXlow[496] * 0.00001,
                                   lwd: reponseXlow[497] * 0.00001,
                                   lwe: reponseXlow[498] * 0.00001,
                                   lwf: reponseXlow[499] * 0.00001,
                                   cla: reponseXclose[494] * 0.00001,
                                   clb: reponseXclose[495] * 0.00001,
                                   clc: reponseXclose[496] * 0.00001,
                                   cld: reponseXclose[497] * 0.00001,
                                   cle: reponseXclose[498] * 0.00001,
                                   clf: reponseXclose[499] * 0.00001,
                                 });

 // THE LOW PRICE NEURAL NETWORK PREDICTION BRAIN #3
                    const LeftLowBrain = [];
                    for (let i = 0; i < reponseXlow.length; i++) {

                      LeftLowBrain.push({
                        input: {
                          opa: reponseXopen[a] * 0.00001,
                          opb: reponseXopen[b] * 0.00001,
                          opc: reponseXopen[c] * 0.00001,
                          opd: reponseXopen[d] * 0.00001,
                          ope: reponseXopen[f] * 0.00001,
                          opf: reponseXopen[i] * 0.00001,
                          hgha: reponseXhigh[a] * 0.00001,
                          hghb: reponseXhigh[b] * 0.00001,
                          hghc: reponseXhigh[c] * 0.00001,
                          hghd: reponseXhigh[d] * 0.00001,
                          hghe: reponseXhigh[f] * 0.00001,
                          hghf: reponseXhigh[i] * 0.00001,

                           cla: reponseXclose[a] * 0.00001,
                           clb: reponseXclose[b] * 0.00001,
                           clc: reponseXclose[c] * 0.00001,
                           cld: reponseXclose[d] * 0.00001,
                           cle: reponseXclose[f] * 0.00001,
                           clf: reponseXclose[i] * 0.00001,
                            },
                      output: {
                        lwa: reponseXlow[a] * 0.00001,
                        lwb: reponseXlow[b] * 0.00001,
                        lwc: reponseXlow[c] * 0.00001,
                        lwd: reponseXlow[d] * 0.00001,
                        lwe: reponseXlow[f] * 0.00001,
                        lwf: reponseXlow[i] * 0.00001,
                          }
                      })
                    }
                    console.log('BRAIN LOW PRICE TRAINING ARRAY :', LeftLowBrain)
                    LowPredictionBrain.train(LeftLowBrain, {
                        errorThresh: 0.0005,
                        log: true, 
                        learningRate: 0.3,
                        momentum: 0.08
                       });
                       const LeftLowResult = LowPredictionBrain.run({

                        opa: reponseXopen[494] * 0.00001,
                        opb: reponseXopen[495] * 0.00001,
                        opc: reponseXopen[496] * 0.00001,
                        opd: reponseXopen[497] * 0.00001,
                        ope: reponseXopen[498] * 0.00001,
                        opf: reponseXopen[499] * 0.00001,
                         hgha: reponseXhigh[494] * 0.00001,
                         hghb: reponseXhigh[495] * 0.00001,
                         hghc: reponseXhigh[496] * 0.00001,
                         hghd: reponseXhigh[497] * 0.00001,
                         hghe: reponseXhigh[498] * 0.00001,
                         hghf: reponseXhigh[499] * 0.00001,
                         cla: reponseXclose[494] * 0.00001,
                         clb: reponseXclose[495] * 0.00001,
                         clc: reponseXclose[496] * 0.00001,
                         cld: reponseXclose[497] * 0.00001,
                         cle: reponseXclose[498] * 0.00001,
                         clf: reponseXclose[499] * 0.00001,
                        });

// THE CLOSE PRICE NEURAL NETWORK PREDICTION BRAIN #4
                    const CenterCloseBrain = [];
                    for (let i = 0; i < reponseXclose.length; i++) {

                      CenterCloseBrain.push({
                        input: {
                          opa: reponseXopen[a] * 0.00001,
                          opb: reponseXopen[b] * 0.00001,
                          opc: reponseXopen[c] * 0.00001,
                          opd: reponseXopen[d] * 0.00001,
                          ope: reponseXopen[f] * 0.00001,
                          opf: reponseXopen[i] * 0.00001,
                          hgha: reponseXhigh[a] * 0.00001,
                          hghb: reponseXhigh[b] * 0.00001,
                          hghc: reponseXhigh[c] * 0.00001,
                          hghd: reponseXhigh[d] * 0.00001,
                          hghe: reponseXhigh[f] * 0.00001,
                          hghf: reponseXhigh[i] * 0.00001,
                          lwa: reponseXlow[a] * 0.00001,
                          lwb: reponseXlow[b] * 0.00001,
                          lwc: reponseXlow[c] * 0.00001,
                          lwd: reponseXlow[d] * 0.00001,
                          lwe: reponseXlow[f] * 0.00001,
                          lwf: reponseXlow[i] * 0.00001,
                            },
                      output: {
                        cla: reponseXclose[a] * 0.00001,
                        clb: reponseXclose[b] * 0.00001,
                        clc: reponseXclose[c] * 0.00001,
                        cld: reponseXclose[d] * 0.00001,
                        cle: reponseXclose[f] * 0.00001,
                        clf: reponseXclose[i] * 0.00001,
                          }
                      })
                    }
                    console.log('BRAIN CLOSE PRICE TRAINING ARRAY : ', CenterCloseBrain)
                    ClosePredictionBrain.train(CenterCloseBrain, {
                        errorThresh: 0.0005,
                        log: true, 
                        learningRate: 0.3,
                        momentum: 0.08
                       });
                       const CenterCloseResult = ClosePredictionBrain.run({

                        opa: reponseXopen[494] * 0.00001,
                        opb: reponseXopen[495] * 0.00001,
                        opc: reponseXopen[496] * 0.00001,
                        opd: reponseXopen[497] * 0.00001,
                        ope: reponseXopen[498] * 0.00001,
                        opf: reponseXopen[499] * 0.00001,
                         hgha: reponseXhigh[494] * 0.00001,
                         hghb: reponseXhigh[495] * 0.00001,
                         hghc: reponseXhigh[496] * 0.00001,
                         hghd: reponseXhigh[497] * 0.00001,
                         hghe: reponseXhigh[498] * 0.00001,
                         hghf: reponseXhigh[499] * 0.00001,
                         lwa: reponseXlow[494] * 0.00001,
                         lwb: reponseXlow[495] * 0.00001,
                         lwc: reponseXlow[496] * 0.00001,
                         lwd: reponseXlow[497] * 0.00001,
                         lwe: reponseXlow[498] * 0.00001,
                         lwf: reponseXlow[499] * 0.00001,
                        });

////////////////////////////////******//END OF THE NEURAL NETWORK//*********

/////////////////////// THE FOUR MAIN PREDICTION RESULT HERE*******
  OpenBrainResulta.push(CenterOpenResult.opf / 0.00001);
  OpenBrainResultb.push(CenterOpenResult.opb / 0.00001);
  OpenBrainResultc.push(CenterOpenResult.opc / 0.00001);
  OpenBrainResultd.push(CenterOpenResult.opd / 0.00001);
  OpenBrainResulte.push(CenterOpenResult.ope / 0.00001);
  OpenBrainResultf.push(CenterOpenResult.opa / 0.00001);
  HighBrainResult.push(RightHighResult.hghf / 0.00001);
  LowBrainResult.push(LeftLowResult.lwf / 0.00001);
  CloseBrainResult.push(CenterCloseResult.clf / 0.00001);
  console.log(OpenBrainResulta, HighBrainResult, LowBrainResult, CloseBrainResult)




  ////EPOXTIME TASK
  /*
const epoxArray = [];
const epoxOverFlow = [];

for(let i = 0; i <= epoxArray.length; i++) {
  var M = reponseXopen.length;
  var gogo = OpenBrainResult.length;
if(epoxArray.length < OpenBrainResult.length) {epoxArray.push(reponseXopen[i + M - gogo])}else{epoxArray.push(epoxArray[0])}   
if(epoxArray.length === OpenBrainResult.length) {epoxArray.splice(0,epoxArray[0])} 
}
console.log("Open Price: ", epoxArray)
console.log("OP over-flow array: ", epoxOverFlow)
*/
////PREP OPEN PRICE FOR PREDICTION CHART TO FETCH ONLY THE LATESS PRICE 
const epoxResult =[];
const epoxOverFlow =[];

for(let i = 0; i <= epoxResult.length; i++) {
  var Lili = reponseXopen.length;
  var gago = OpenBrainResulta.length;
if(epoxResult.length < OpenBrainResulta.length) {epoxResult.push(epoxNum[i + Lili- gago])}else{epoxOverFlow.push(epoxResult[0])}   
if(epoxResult.length === OpenBrainResulta.length) {epoxOverFlow.splice(0,epoxResult[0])} 
}
console.log("Epox Number: ", epoxResult);
console.log("EPX over-flow array: ", epoxOverFlow);

////PREP OPEN PRICE FOR PREDICTION CHART TO FETCH ONLY THE LATESS PRICE 
const openPriceResult =[];
const openPriceOverFlow =[];

for(let i = 0; i <= openPriceResult.length; i++) {
  var L = reponseXopen.length;
  var gaga = OpenBrainResulta.length;
if(openPriceResult.length < OpenBrainResulta.length) {openPriceResult.push(reponseXopen[i + L- gaga])}else{openPriceOverFlow.push(openPriceResult[0])}   
if(openPriceResult.length === OpenBrainResulta.length) {openPriceOverFlow.splice(0,openPriceResult[0])} 
}
console.log("Open Price: ", openPriceResult);
console.log("OP over-flow array: ", openPriceOverFlow);


////HIGH PRICE RESULT TASK
const highPriceResult =[];
const highPriceOverFlow =[];

for(let i = 0; i <= openPriceResult.length; i++) {
  var Lh = reponseXopen.length -1;
  var gagaH = OpenBrainResulta.length;
if(highPriceResult.length < HighBrainResult.length) {highPriceResult.push(reponseXhigh[i + Lh - gagaH])}else{highPriceOverFlow.push(highPriceResult[0])}   
if(highPriceResult.length === HighBrainResult.length) {highPriceOverFlow.splice(0,highPriceResult[0])} 
}
console.log("High Price: ", highPriceResult);
console.log("HP over-flow array: ", highPriceOverFlow);

////LOW PRICE RESULT TASK
const lowPriceResult =[];
const lowPriceOverFlow =[];

for(let i = 0; i <= lowPriceResult.length; i++) {
  var Ll = reponseXopen.length -1;
  var gagaL = LowBrainResult.length;
if(lowPriceResult.length < LowBrainResult.length) {lowPriceResult.push(reponseXlow[i + Ll- gagaL])}else{lowPriceOverFlow.push(lowPriceResult[0])}   
if(lowPriceResult.length === LowBrainResult.length) {lowPriceOverFlow.splice(0,lowPriceResult[0])} 
}
console.log("Low Price: ", lowPriceResult);
console.log("LP over-flow array: ", lowPriceOverFlow);

////CLOSE PRICE RESULT TASK
const closePriceResult =[];
const closePriceOverFlow =[];

for(let i = 0; i <= openPriceResult.length; i++) {
  var Lc = reponseXclose.length;
  var gagac = OpenBrainResulta.length;
if(closePriceResult.length < CloseBrainResult.length) {closePriceResult.push(reponseXclose[i + Lc- gagac])}else{closePriceOverFlow.push(closePriceResult[0])}   
if(closePriceResult.length === CloseBrainResult.length) {closePriceOverFlow.splice(0,closePriceResult[0])} 
}
console.log("Close** Price**: ", closePriceResult);
console.log("CP** over-flow array: ", closePriceOverFlow);

////OPEN BRAIN RESULT TASK
  const openBrainResult =[];
  const brOPI =[];

for(let i = 0; i < OpenBrainResulta.length; i++) {
  if(openBrainResult.length <= number) {openBrainResult.push(OpenBrainResulta[i])}else{brOPI.push(openBrainResult[0])}   
  if(openBrainResult.length === number) {brOPI.splice(0,openBrainResult[0])} 
}
  console.log("OPEN PREDICTED; ", openBrainResult);
  console.log("OP: ", brOPI);

  console.log(openBrainResult.values)

////PREPAIR AVERAGE BETWEEN THE ASSET OPEN PRICE AND THE OPEN PREDICTED
  const AvgElem1OpenOpen = [];
  const Elem1 = [];
for(let i = 0; i < OpenBrainResulta.length; i++) {
  var elemOf1 = i;
console.log(elemOf1);
  let elemOf1B = openBrainResult[elemOf1] * 0.00001;
console.log('PREDICTED OPEN: ', elemOf1B);
  let elemOf1C = openPriceResult[elemOf1] * 0.00001;
console.log('OPEN MARKET PRICE: ', elemOf1C);
       Elem1.push([(elemOf1C + elemOf1B) * 0.000005] / 0.0000000001);
        AvgElem1OpenOpen.push(Elem1);
if(AvgElem1OpenOpen.length <= i) {AvgElem1OpenOpen.push(Elem1[i])}else{}
}
console.log(Elem1);

console.log(AvgElem1OpenOpen);


////HIGH BRAIN RESULT TASK
  const highBrainResult = [];
  const hghVSI = [];
  
  for(let i = 0; i < HighBrainResult.length; i++) {
    if(highBrainResult.length <= number) {highBrainResult.push(HighBrainResult[i])}else{hghVSI.push(highBrainResult[0])}   
    if(highBrainResult.length === number) {hghVSI.splice(0,highBrainResult[0])}                              
    }

  console.log("HIGH PREDICTED : ", highBrainResult);
  console.log("HP: ", hghVSI);

      ////PREPAIR AVERAGE BETWEEN THE ASSET HIGH PRICE AND THE HIGH PREDICTED
const AvgElem2HighHigh = [];
const Elem2 = [];
for(let i = 0; i < HighBrainResult.length; i++) {
var elemOf2 = i;
console.log(elemOf2);
let elemOf2B = highBrainResult[elemOf2] * 0.00001;
console.log('PREDICTED HIGH : ', elemOf2B);
let elemOf2C = highPriceResult[elemOf2] * 0.00001;
console.log('HIGH MARKET PRICE: ', elemOf2C);
Elem2.push([(elemOf2C + elemOf2B) * 0.000005] / 0.0000000001);
AvgElem2HighHigh.push(Elem2);
if(AvgElem2HighHigh.length <= i) {AvgElem2HighHigh.push(Elem2[i])}else{}
}
console.log(Elem2);

console.log(AvgElem2HighHigh);

////LOW BRAIN RESULT TASK 
  const lowBrainResult = [];
  const lowVSI = [];
  
  for(let i = 0; i < LowBrainResult.length; i++) {
    if(lowBrainResult.length <= number) {lowBrainResult.push(LowBrainResult[i])}else{lowVSI.push(lowBrainResult[0])}   
    if(lowBrainResult.length === number) {lowVSI.splice(0,lowBrainResult[0])}                              
      }

  console.log("LOW PREDICTED : ", lowBrainResult);
  console.log("LP: ",lowVSI);

      ////PREPAIR AVERAGE BETWEEN THE ASSET LOW PRICE AND THE LOW PREDICTED
const AvgElem3LowLow = [];
const Elem3 = [];
for(let i = 0; i < LowBrainResult.length; i++) {
var elemOf3 = i;
console.log(elemOf3);
let elemOf3B = lowBrainResult[elemOf3] * 0.00001;
console.log('PREDICTED LOW: ', elemOf3B);
let elemOf3C = lowPriceResult[elemOf3] * 0.00001;
console.log('LOW MARKET PRICE: ', elemOf3C);
Elem3.push([(elemOf3C + elemOf3B) * 0.000005] / 0.0000000001);
AvgElem3LowLow.push(Elem3);
if(AvgElem3LowLow.length <= i) {AvgElem3LowLow.push(Elem2[i])}else{}
};
console.log(Elem3);

console.log(AvgElem3LowLow);





////CLOSE BRAIN RESULT TASK
  const closeBrainResult = [];
  const clVSI = [];
  
  for(let i = 0; i < CloseBrainResult.length; i++) {
    if(closeBrainResult.length <= number) {closeBrainResult.push(CloseBrainResult[i])}else{clVSI.push(closeBrainResult[0])}   
    if(closeBrainResult.length === number) {clVSI.splice(0,closeBrainResult[0])}                              
    
  }
  console.log("CLOSE PREDICTED : ", closeBrainResult);
  console.log("CP: ",clVSI);



////PREPAIR AVERAGE BETWEEN THE ASSET CLOSE PRICE AND THE CLOSE PREDICTED
const AvgElem4CloseClose = [];
const Elem4 = [];

for(let i = 0; i < closeBrainResult.length; i++) {
var elemOf4 = i;
console.log(elemOf4);
let elemOf4B = closeBrainResult[elemOf4] * 0.00001;
console.log('PREDICTED CLOSE: ', elemOf4B);
let elemOf4C = closePriceResult[elemOf4] * 0.00001;

console.log('CLOSE MARKET PRICE: ', elemOf4C);
Elem4.push([(elemOf4B + elemOf4C) * 0.000005] / 0.0000000001);
AvgElem4CloseClose.push(Elem4);
if(AvgElem4CloseClose.length <= i) {AvgElem4CloseClose.push(Elem4[i])}else{}
}
console.log(Elem4);

console.log(AvgElem4CloseClose);




//console.log("Incomming Latess Price : ", OpenPrice)
console.log("Incomming Array Length : ", DataLength)
//console.log("ILP: ",opVSI)


console.log(reponseXopen[valueX] - OpenBrainResulta[0])

 const LowPredicted = [LowBrainResult[0] - LowPrice[0]];
 const RealLow = [LowPrice[0] - LowBrainResult[0]];

 const HghPredicted = [HighBrainResult[0] - HighPrice[0]]
 const RealHigh = [HighPrice[0] - HighBrainResult[0]];

 const ClsPredicted = [CloseBrainResult[0] - ClosePrice[0]];
 const RealClose = [ClosePrice[0] - CloseBrainResult[0]];

 const RvsPredicted = [ThePrice[valueX] - OpenBrainResulta[0]];
 //const PvsReal = [OpenBrainResult[0] - FinalPriceArray];

 const midOP = [];
 const midOPI = [];
 for(let i = 0; i < highBrainResult.length; i++) {
    if(midOP.length <= number-1) {midOP.push(((HighBrainResult[i] + OpenBrainResulta[i] + CloseBrainResult[i]) + LowBrainResult[i]) / 4)}else{midOPI.push(((HighBrainResult[i] + OpenBrainResulta[i] + CloseBrainResult[i]) + LowBrainResult[i]) / 4)}   
    if(midOP.length === number) {midOPI.splice(0, midOP[0])}
  }
  console.log("midleLine: ",midOP)
  console.log("midleLineI: ",midOPI)

///////////////////////////////////////////////////////////////////////******BEGINNING OF LAYER TWO NEURAL NETWORK*** */
// LAYER TWO  NETWORK PREDICTION BRAIN #1 OF #4  LayerIIOpenResult
const LayerIIOpenBrain = [];
for (let i = 0; i < OpenBrainResulta.length; i++) {

  LayerIIOpenBrain.push({
  input: {
       avergl: midOP[i] * 0.00001,
         hghr: highPriceResult[i] * 0.00001,
          lwr: lowPriceResult[i] * 0.00001,
          clr: closePriceResult[i] * 0.00001,
         elm1: Elem1[i] * 0.00001,
         elm2: Elem2[i] * 0.00001,
         elm3: Elem3[i] * 0.00001,
         elm4: Elem4[i] * 0.00001,
          obr: openBrainResult[i] * 0.00001,
          hbr: highBrainResult[i] * 0.00001,
          lbr: lowBrainResult[i] * 0.00001,
          cbr: closeBrainResult[i] * 0.00001
  },
  output: {
         opr: openPriceResult[i] * 0.00001,
         
    }
  })
}
console.log('LAYER TWO TARGET PRICE **OPEN** TRAINING ARRAY : ', LayerIIOpenBrain)
OpenReAquiredTarget.train(LayerIIOpenBrain, {
    errorThresh: 0.0005,
    log: true, 
    learningRate: 0.3,
    momentum: 0.08
   });
   let e = Elem1.length-1
   console.log(e)
   const LayerIIOPBrainResult = OpenReAquiredTarget.run(
     {
       avergl: midOP[e] * 0.00001,
         hghr: highPriceResult[e] * 0.00001,
          lwr: lowPriceResult[e] * 0.00001,
          clr: closePriceResult[e] * 0.00001,
         elm1: Elem1[e] * 0.00001,
         elm2: Elem2[e] * 0.00001,
         elm3: Elem3[e] * 0.00001,
         elm4: Elem4[e] * 0.00001,
          obr: openBrainResult[e] * 0.00001,
          hbr: highBrainResult[e] * 0.00001,
          lbr: lowBrainResult[e] * 0.00001,
          cbr: closeBrainResult[e] * 0.00001
    });
    console.log('H: ', highPriceResult[e], 'L: ', lowPriceResult[e],  'C: ', closePriceResult[e], 'test H: ', highPriceResult)
    LayerIIOpenResult.push(LayerIIOPBrainResult.opr / 0.00001);
    console.log(LayerIIOPBrainResult.opr / 0.00001, '*********', LayerIIOpenResult)
//////////////////////////////////////////////////////////////////////////////////////////
// LAYER TWO  NETWORK PREDICTION BRAIN #2 OF #4  LayerIIHighResult
const LayerIIHighBrainPrice = [];
for (let i = 0; i < OpenBrainResulta.length; i++) {

  LayerIIHighBrainPrice.push({
  input: {
       avergl: midOP[i] * 0.00001,
         clr: closePriceResult[i] * 0.00001,
          lwr: lowPriceResult[i] * 0.00001,
          opr: openPriceResult[i] * 0.00001,
         elm1: Elem1[i] * 0.00001,
         elm2: Elem2[i] * 0.00001,
         elm3: Elem3[i] * 0.00001,
         elm4: Elem4[i] * 0.00001,
          obr: openBrainResult[i] * 0.00001,
          hbr: highBrainResult[i] * 0.00001,
          lbr: lowBrainResult[i] * 0.00001,
          cbr: closeBrainResult[i] * 0.00001
  },
  output: {
    hghr: highPriceResult[i] * 0.00001,
         
    }
  })
}
console.log('LAYER TWO TARGET PRICE **HIGH** TRAINING ARRAY : ', LayerIIHighBrainPrice)
OpenReAquiredTargetHG.train(LayerIIHighBrainPrice, {
    errorThresh: 0.0005,
    log: true, 
    learningRate: 0.3,
    momentum: 0.08
   });
   //let e = Elem1.length-1
   console.log(e)
   const LayerIIHGBrainResult = OpenReAquiredTargetHG.run(
     {
       avergl: midOP[e] * 0.00001,
          clr: closePriceResult[e] * 0.00001,
          lwr: lowPriceResult[e] * 0.00001,
          opr: openPriceResult[e] * 0.00001,
         elm1: Elem1[e] * 0.00001,
         elm2: Elem2[e] * 0.00001,
         elm3: Elem3[e] * 0.00001,
         elm4: Elem4[e] * 0.00001,
          obr: openBrainResult[e] * 0.00001,
          hbr: highBrainResult[e] * 0.00001,
          lbr: lowBrainResult[e] * 0.00001,
          cbr: closeBrainResult[e] * 0.00001
    });
    console.log('H: ', highPriceResult[e], 'L: ', lowPriceResult[e],  'C: ', closePriceResult[e], 'test H: ', highPriceResult)
    LayerIIHighResult.push(LayerIIHGBrainResult.hghr / 0.0001);
console.log(' LAYER TWO HIGH RESULT: ', LayerIIHighResult)

//////////////////////////////////////////////////////////////////////////////////
// LAYER TWO  NETWORK PREDICTION BRAIN #3 OF #4  LayerIILowResult
const LayerIILowBrainPrice = [];
for (let i = 0; i < OpenBrainResulta.length; i++) {

  LayerIILowBrainPrice.push({
  input: {
       avergl: midOP[i] * 0.00001,
         clr: closePriceResult[i] * 0.00001,
          lwr: lowPriceResult[i] * 0.00001,
          opr: openPriceResult[i] * 0.00001,
         elm1: Elem1[i] * 0.00001,
         elm2: Elem2[i] * 0.00001,
         elm3: Elem3[i] * 0.00001,
         elm4: Elem4[i] * 0.00001,
          obr: openBrainResult[i] * 0.00001,
          hbr: highBrainResult[i] * 0.00001,
          lbr: lowBrainResult[i] * 0.00001,
          cbr: closeBrainResult[i] * 0.00001
  },
  output: {
    hghr: highPriceResult[i] * 0.00001,
         
    }
  })
}
console.log('LAYER TWO TARGET PRICE **LOW** TRAINING ARRAY : ', LayerIILowBrainPrice)
OpenReAquiredTargetLW.train(LayerIILowBrainPrice, {
    errorThresh: 0.0005,
    log: true, 
    learningRate: 0.3,
    momentum: 0.08
   });
   //let e = Elem1.length-1
   console.log(e)
   const LayerIILWBrainResult = OpenReAquiredTargetLW.run(
     {
       avergl: midOP[e] * 0.00001,
          clr: closePriceResult[e] * 0.00001,
          lwr: lowPriceResult[e] * 0.00001,
          opr: openPriceResult[e] * 0.00001,
         elm1: Elem1[e] * 0.00001,
         elm2: Elem2[e] * 0.00001,
         elm3: Elem3[e] * 0.00001,
         elm4: Elem4[e] * 0.00001,
          obr: openBrainResult[e] * 0.00001,
          hbr: highBrainResult[e] * 0.00001,
          lbr: lowBrainResult[e] * 0.00001,
          cbr: closeBrainResult[e] * 0.00001
    });
    console.log('H: ', highPriceResult[e], 'L: ', lowPriceResult[e],  'C: ', closePriceResult[e], 'test H: ', highPriceResult)
    LayerIILowResult.push(LayerIILWBrainResult.hghr / 0.00001);
console.log(' LAYER TWO LOW RESULT: ', LayerIILowResult);

////////////////////////////////////////////////////////////////////
// LAYER TWO  NETWORK PREDICTION BRAIN #2 OF #4  LayerIICloseResult
const LayerIICloseBrainPrice = [];
for (let i = 0; i < OpenBrainResulta.length; i++) {

  LayerIICloseBrainPrice.push({
  input: {
       avergl: midOP[i] * 0.00001,
         hghr: highPriceResult[i] * 0.00001,
          lwr: lowPriceResult[i] * 0.00001,
          opr: openPriceResult[i] * 0.00001,
         elm1: Elem1[i] * 0.00001,
         elm2: Elem2[i] * 0.00001,
         elm3: Elem3[i] * 0.00001,
         elm4: Elem4[i] * 0.00001,
          obr: openBrainResult[i] * 0.00001,
          hbr: highBrainResult[i] * 0.00001,
          lbr: lowBrainResult[i] * 0.00001,
          cbr: closeBrainResult[i] * 0.00001
  },
  output: {
         clr: closePriceResult[i] * 0.00001,
         
    }
  })
}
console.log('LAYER TWO TARGET PRICE **CLOSE** TRAINING ARRAY : ', LayerIICloseBrainPrice)
OpenReAquiredTargetCL.train(LayerIICloseBrainPrice, {
    errorThresh: 0.0005,
    log: true, 
    learningRate: 0.3,
    momentum: 0.08
   });
   //let e = Elem1.length-1
   console.log(e)
   const LayerIICLBrainResult = OpenReAquiredTargetCL.run(
     {
       avergl: midOP[e] * 0.00001,
         hghr: highPriceResult[e] * 0.00001,
          lwr: lowPriceResult[e] * 0.00001,
          opr: openPriceResult[e] * 0.00001,
         elm1: Elem1[e] * 0.00001,
         elm2: Elem2[e] * 0.00001,
         elm3: Elem3[e] * 0.00001,
         elm4: Elem4[e] * 0.00001,
          obr: openBrainResult[e] * 0.00001,
          hbr: highBrainResult[e] * 0.00001,
          lbr: lowBrainResult[e] * 0.00001,
          cbr: closeBrainResult[e] * 0.00001
    });
    console.log('H: ', highPriceResult[e], 'L: ', lowPriceResult[e],  'C: ', closePriceResult[e], 'test H: ', highPriceResult)
    LayerIICloseResult.push(LayerIICLBrainResult.clr / 0.00001);
console.log(' LAYER TWO CLOSE RESULT: ', LayerIICloseResult);
/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////************END OF LAYER TWO NEURAL NETWORK */
/////////////////////////////////////////////////////////////////////
//latest open price - the elem1 
OpenMomentumX.push(ThePrice - Elem1[e]);
console.log(OpenMomentumX);
OpenVsMomentum.push(ThePrice - OpenBrainResulta[e]);
console.log(OpenVsMomentum);

//latess high price - the elem2
HighMomentumX.push(HighPrice - Elem2[e]);
console.log(HighMomentumX);
HighVsMomentum.push(HighPrice - HighBrainResult[e]);
console.log(HighVsMomentum);
//latess low price - the elem3
LowMomentumX.push(LowPrice - Elem3[e]);
console.log(LowMomentumX);
LowVsMomentum.push(LowPrice - LowBrainResult[e]);
console.log(LowVsMomentum);
//latess close price - the elem4
CloseMomentumX.push(ClosePrice - Elem4[e]);
console.log(CloseMomentumX);
CloseVsMomentum.push(ClosePrice - CloseBrainResult[e]);
console.log(CloseVsMomentum);

mouthSize.push(Elem2[e]-Elem3[e]);
console.log(mouthSize.length);

mouthCeilingSize.push(HighPrice - Elem2[e]);
console.log(mouthCeilingSize)
mouthFloorSize.push(LowPrice - Elem3[e]);
console.log(mouthFloorSize)
 
TongueSize.push(HighPrice - LowPrice);
console.log(TongueSize.length)

BrOpToNewOp.push(Elem1[e] - OpenBrainResulta[e]);
console.log(BrOpToNewOp);
//
BrHgToNewHg.push(Elem2[e] - HighBrainResult[e]);
console.log(BrHgToNewHg);
//
BrLwToNewLw.push(Elem3[e] - LowBrainResult[e]);
console.log(BrLwToNewLw);
//
BrClToNewCl.push(Elem4[e] - CloseBrainResult[e]);
console.log(BrClToNewCl);
 
/////////
    dispatch({
      type: "SUCCESS_BITCOIN",
      payload: {
    
         
         number,
         midOP,
       // epoxDate,
        // epoxArray,
        OpenVsMomentum,
        HighVsMomentum,
        LowVsMomentum,
        CloseVsMomentum,
        OpenMomentumX,
        HighMomentumX,
        LowMomentumX,
        CloseMomentumX,
        TongueSize, //THE PRICE OF ASSET HIGH vs LOW
        mouthCeilingSize,//high predicted vs high latess
        mouthFloorSize, //low predicted vs low latess
        mouthSize, //THE BRAIN PREDICTION HIGH vs LOW
        LayerIIOpenResult,
        LayerIIHighResult,
        LayerIILowResult,
        LayerIICloseResult,

         Elem1,
         Elem2,
         Elem3,
         Elem4,
         ThePrice,
         epoxResult,
         openPriceResult,
         closePriceResult,
         ClosePrice,
         closeBrainResult,
         highBrainResult,
         lowBrainResult,
         openBrainResult,
    


         ClsPredicted,
         RealClose,

         HghPredicted,
         RealHigh,

         LowPredicted,
         RealLow,

         RvsPredicted,
        // PvsReal,
        BrOpToNewOp,
        BrHgToNewHg,
        BrLwToNewLw,
        BrClToNewCl,
            
         OpenBrainResulta,
         CloseBrainResult,
         HighBrainResult,
         LowBrainResult,

         reponseXopen,
         reponseXhigh,
         reponseXclose,
         reponseXlow,
        // epox,
         open,
         high,
         low,
         close,
         labels
      }
    })
   
  } catch (e) {
    dispatch({
      type: "REJECTED_BITCOIN",
    })
  }
}





