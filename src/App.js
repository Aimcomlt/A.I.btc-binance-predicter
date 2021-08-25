import React from 'react';
//import Iframe from 'react-iframe';
//import { Linking } from 'react-native';
import './App.css';
import { Line } from 'react-chartjs-2';
//import { Radar } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./actions/bitcoinActions";

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.bitcoin)
  const stateB = useSelector(state => state.brain)
  const [num] = React.useState(500); 
    
  const fetchData = (time) => {
    //Fetch data from redux using time
    dispatch(getData({
      time: time,
      number: num,
    }))
  }
///<input onChange={e => setNum(e.target.value)} />
return (
  <div className="App">
    <div className="toppageNav">
      <br />
      <h1>A.I.🤖 vs Binance exchange BTC/USD Timeseries</h1>
      <h1 style={{marginLeft:'13px', marginRight:'13px'}}>NEURAL NETWORK PREDICTER FUNCTION</h1>
  <h5 style={{marginLeft:'25px'}}>POWERED BY BRAIN.JS, CHART JS, REDUX AND REACT APP</h5>
      <br />
    </div>
  <div className="navbar">
  </div>

  <div className="info">
  <h2>◻️Word from the developer◻️</h2>
    <h4>This is were the magic🪄 begins, using brain.js neural network to predict trends📈. But truly were to start?🤔</h4>
    <h4>Working with brain js transported me back when I was a kid😛 with water colors. Playing was the beginning, mixing all thoses colors and learning was the end result.</h4>
    <h4>‼️Bouya‼️ 🤣I was really good at making black!🤣</h4>
    
    <h2>◻️Quote◻️</h2>
    <h4>If one decides to clone this code solution I know all ready a lot about you.</h4>
    <h4>I know your favorite type of music. It's Techno-music. And why do I know this?</h4>
    <h4>Simple because the brain loves it.🥰</h4>
  </div>
     <div className={"chart-wrapper"}>
     </div>
        <div className={"btns-wrapper"}>
        <div className="info">
        <div className="title">
          
  </div>
  <h2>🏁Start binance exchange BTC/USD timeseries session.</h2>
  <button className='btns-wrapper' onClick={() => setInterval(() => {fetchData("1min")}, 60100)}>⏳START 1 MIN INTERVAL</button>
          <button className='btns-wrapper' onClick={(() => {fetchData()})}>🕳️INSERT TRAINNING DATA📃📃... NOW🕳️</button>
          <h4>The Training array snapshot📸.</h4>
         <Line 
         data={state.data} options={{responsive: true}}
         /></div>
      
      
        
            
            {state.loading && <p>Loading...</p>}
          </div>

      

         <div className='container'>

         <h3> NEURAL NETWORK PREDICTED ASSET ANALYSES </h3>
         <h4>⚪ In this chart the four lines uses the neural networks predicted data price and latess market data price.</h4>
         <h4>⚪ Description of the red line: neural network predicted open price is average with the latess open price then this result is substracted from its own neural predicted open.</h4>
         <h4>⚪ Description of the light blue line: neural network predicted high price is average with the latess high price then this result is substracted from its own neural predicted high.</h4>
         <h4>⚪ Description of the yellow line: neural network predicted low price is average with the latess low price then this result is substracted from its own neural predicted low.</h4>
         <h4>⚪ Description of the blue line: neural network predicted close price is average with the latess close price then this result is substracted from its own neural predicted close.</h4>
         <h4>⚪ With the mesurement of its self the result can be used to estimate, measure, or note the similarity or dissimilarity between other assets</h4>

         <div className='chartBarVol' style={{height:'80%', width:'80%'}}>
         <Bar
         data={stateB.dataG} options={{responsive: true}}
         /></div>
                    <div>
             <h3> NEURAL NETWORK PREDICTED ASSET ANALYSES </h3>
             <h4>⚪ The yellow line is the result of the latess high - the latess low (real time stream)</h4>
             <h4>⚪ The blue line is the result of the neural networks high - low (the predicted result)</h4>
             <h4>⚪ This two results gives us the oppertunity to scope the past and the present.</h4>
             <h4>⚪ The blue line demonstrate were the volitility should be and the yellow line demonstrates the facts</h4>
             <h4>⚪ Now by mixing the predicted high with the latess high we get the brown line.</h4>
             <h4>⚪ Same by mixing the predicted low with the latess low we get the orange line</h4>
             <h4>⚪ To build a triggers we need to find an anomelies not any kind but re-occuring ones.</h4>
             <h4>⚪ What never happens but suddenly it does? Answer: The orange never dips under the brown line.</h4>
             <h4>⚪ Bouya! If you see this, your good to fire! But wait! How about risk management, let's not sentimentalize but compartmentalize</h4>
             <h4>⚪ Let's call all the neural brains out there by broadcasting the neural networks result as a signature</h4>
             <h4>⚪ The signature is for example ETH/USD market behavior and behavior is a question.</h4>
             <h4>⚪ What happens to the asset value when the tied rises and recedes?</h4>
             <h4>⚪ Can we capture the unic behavior of the asset as a self? This mesurement becomes the asset unic signature.</h4>
             <h4>⚪ The output result of the force-training a.i. on it's own price array can only be replicaded by the same behavior.</h4>
             <h4>⚪ When using this signature to compare diffrent assets. There are no assets that can be identical.</h4>
             <h4>⚪ The secret recepe is that all the assets that most ressembles other assets will profit in value and the assets that do not ressemble the popularity will loose momentum when the tide rises and receide</h4>
             <h4>⚪ The signature is the magic to compare its self with it's self but force trained identicaly to analize a different asset.</h4>
             <p>⚪ The beauty of brain.js or any a.i. moch up is that for the computation to happen smoothly all the inputs must be normalized.</p>
             <p>⚪ What does this actualy mean, well the brain does not look at bitcoin at 50 069.00$ it looks at it like this 0.50069</p>
             <p>⚪ If ETHER for example is at 3069.00$USD it looks at it in the same way as bitcoin O.3069</p>
             <p>⚪ And if some coin value is example 0.000056 the neural network normalizes it to 0.56. Code prep is required for this to happen.</p> 
             <h4>⚪ Ok...</h4>
             

             </div>
                  <div className='chartGLine' style={{height:'100%', width:'fit-content(100)'}}>
  
         <Line 
         data={stateB.dataC} options={{responsive: true}}
         /></div>



         <div>
             <h3> NEURAL NETWORK PREDICTED ASSET VALUE VERSES THE OPEN MARKET LATESS ASSET VALUE </h3>
             <h4>⚪ In this explicite chart only OPEN is expose to visualy compare all the predicted result from the neural network(red line)</h4>
             <h4>⚪ The predicted output determines the strength or weakness of the past market.</h4>
             <h4>⚪ By introducing the latess Price it becomes obvious if the latess market prices is strong or weak and can be measured</h4>
             </div>
         <div className='chartBarLin' style={{height:'100%', width:'fit-content(100)'}}>

         <Line 
         data={stateB.dataD} options={{responsive: true}}
         /></div>
                    <div>
             <h3>NEURAL NETWORK PREDICTED ASSET ANALYSES </h3>
             <h4>⚪ When we use the word predicted! All the instances of brain.js's neural networks that is used in this code solution,</h4>
             <h4>⚪ with out exception⛔ is never introduce with historical data like Macd values. Let's deep dive, to explain the why.</h4>
             <h4>⚪ The why comes from understanding the principal of the neural networks force trained methology.</h4>
             <h4>⚪ It's good at what it does. If you want a MACD indicator the neural network will output MACD indicator values. Is that what you want?</h4>
             <h4>⚪ The neural network has to be ultra compartementalize. In this solution the code is build to target the behavior of the open, high, low and close</h4>
             <h4>⚪ But obviously that brain.js can be used to target indicators and there values to then mesure them agains other indicators or some dark lord methology. :)</h4>
             
             </div>

         <div className='chartFLine' style={{height:'100%', width:'fit-content(100)'}}>
  
         <Line 
         data={stateB.dataF} options={{responsive: true}}
         /></div>
                                      <div>
             <h3>⚪ NEURAL NETWORK PREDICTED ASSET ANALYSES </h3>
             <h4>⚪ The second layer is experimental but none the less very exiting!</h4>
             <h4>⚪ From neural network output♻️ to the input♻️ of a new neural network instance, one must compartmentalize brain.js into sections or categories.</h4>
             <h4>⚪ The chart agglomerates the results of four neural networks instances using latess market data and latess data from the first neural network(first layer)</h4>
             <h4>⚪ When you first start the interval you will notice it is calibrating it's result to target the asset. Its because the training array is very small.</h4>
             <h4>⚪ As the training array increases the calibrating becomes more and more dominant. ☣️Why not let's experiment☣️.</h4>
             
             </div>

         <div className='chartBarRadar' style={{height:'100%', width:'fit-content(100)'}}>
         <Line 
         data={stateB.dataB} options={{responsive: true}}
         /></div>

         </div>
          <h3 className= 'ticker-sym'> BTC/USD TICKER📈</h3>

           </div>
           
           );
          }
          export default App;
/*
          <div>
             <h3>----- NEURAL NETWORK PREDICTED ASSET ANALYSES </h3>
             <h4>⚪ With humbleness to bring light were to man has gone before {`https://discord.gg/UYqAsChs`}</h4>
            <Iframe url="https://www.youtube.com/watch?v=y_UHEy6vbv0"
        width="50px"
        height="50px"
        id="myId"
        className="myClassname"
        display="initial"
        position="center"></Iframe>
            
     <button  onClick url={ () => ("https://discord.gg/UYqAsChs")}>CHECK MY HOME BREW HUB</button>


             
             </div>

*/