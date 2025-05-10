// useState hook imported
import {useState} from 'react';
//Importing routes allows for use of a routes and eventually a navigation bar
import{Routes, Route, Link, useParams} from 'react-router-dom';
import{BrowserRouter as Router} from 'react-router-dom';
//Module created, for CallStockAPIFetch which utilizes an API for stock price 
import {TickerPriceAPIFetch} from './tickerapimodprice.jsx'
//Module created, for CallNameAPIFetch which utilizes an API for stock trading volume 
import {TickerVolumeAPIFetch} from './tickerapimodvolume.jsx'
import './App.css'

// Navigation bar with options for Home and About
function Nav(){
  return <>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </>
}

// Defining all possible paths and associated components
function MyRouteApp(){
  return(
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<My404 />} />
      </Routes>
    </>
  )
}

//Provides Nav bar, and then information specified in the Ticker Form below.
function Home(){
  return <>  <Nav/><TickerForm/>  </>
}

function About(){
  return <><Nav/><h1>About Stock Tracker Plus</h1>
    <img src="./corporateimage.png" alt="Global Tetrahedron Logo"></img>
    <br/><br/>
  Stock Tracker Plus is a not for profit, for profit, organization. An entity of Global Tetrhedron, we offer a free ticker tracking service, but will harvest your information in the process and sell it to the highest bidder. ; D 
  </>
}

function My404(){
  return <><Nav/><h1>Page not found Try returning to the Home Page.</h1></>
}

// Form where tickers can be entered, and their inforamtion will be displayed.   
function TickerForm(){
  const[currState, setCurrState] = useState('')
  // Passes in initial blank array []. setTickers will be used to update the array, and the tickers array will eventually used to reference all added tickers, and map related information about them onto the webpage. 
  const[tickers,setTickers] = useState([])
  const[prices, setPrices] = useState([])
  const[volumes, setVolumes] = useState([])

  // Event handler. Appends ticker and closing price to the existing array using setTickers and setPrices. setCurrState is set to blank '' at end, which resets the text entry box.
  //Due to issues in waiting for API to load, decided to use an await expression, which required making the function async. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  async function handleNewTicker(e){
    e.preventDefault();
    const ticker = currState
    const price = await TickerPriceAPIFetch(ticker);
    const volume = await TickerVolumeAPIFetch(ticker);

    setTickers((st)=>[...st, ticker]);
    // Adds a key:value pair for the ticker:price.
    setPrices((st)=>({...st, [ticker]:price}));
    // Adds a key:value pair for the ticker:name.
    setVolumes((st)=>({...st, [ticker]:volume}));

    setCurrState('');
}

  return(
    <>
    <h1>Stock Tracker Plus</h1>
    <br></br>
    {/* Drew upon week 12 lecture process of utilizing a form to add new values. */}
    <form>
      Add a stock ticker to your watch list: 
      <input type='text' name="newTicker" value={currState}
      onChange={(e)=>setCurrState(e.target.value)}/>
      <br/><br/>
      {/* The button associated with the input above. Calls handleNewTicker event handler passing in value information stored in e. */}
      <button onClick={(e)=>handleNewTicker(e)}>Add Ticker</button>
    </form>
    <hr/>
    {/* Each item in the tickers array is mapped to a LI. Prices array is references for the price information associated with the ticker. */}
    <ul className='ticker-list'>
      {tickers.map((ticker,i)=><li key={i}>Symbol: {ticker} Price: $ {prices[ticker]} Trading Volume:  {volumes[ticker]}</li>)}
    </ul>
    </>
  )
}

function App() {

  return(
    // Syntax for providing multiple routes (Home, About, 404).
    <Router>
      <MyRouteApp/>
    </Router>
)
}

export default App
