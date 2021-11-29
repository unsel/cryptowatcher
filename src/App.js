import React,{useState,useEffect} from 'react';
import { Routes,Route} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import NavBar from './components/Navbar/navbar';
import HomePage from './pages/Homepage/homepage.jsx';
import Modal from './components/Modal/modal.jsx';
import Converter from './pages/Converter/converter';
import Wallet from './pages/Wallet/wallet';
import Exchanges from './pages/Exchanges/exchanges';
import axios from 'axios';
import './App.scss';

import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [renderAuthenticator,setRenderAuthenticator] = useState(false);
  const [currencyData,setCurrencyData] = useState({})
  

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);
    useEffect(()=>{
      setCurrencyData({
        "Bitcoin": {
            "market_cap": 1022401068225.5798,
            "market_cap_dominance": 42.0298,
            "percent_change_1h": -0.25237034,
            "percent_change_24h": -1.56828555,
            "percent_change_30d": -13.60893529,
            "percent_change_60d": 30.42062644,
            "percent_change_7d": -8.68292949,
            "percent_change_90d": 12.46824041,
            "price": 54136.937090846906,
            "volume_24h": 23801996709.280952,
            "volume_change_24h": -23.9299,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg"
        },
        "Ethereum": {
            "market_cap": 481618072843.31995,
            "market_cap_dominance": 19.7988,
            "percent_change_1h": -0.14008153,
            "percent_change_24h": -1.8698252,
            "percent_change_30d": -8.24702831,
            "percent_change_60d": 42.73722457,
            "percent_change_7d": -6.47471982,
            "percent_change_90d": 25.04006319,
            "price": 4063.4108322585234,
            "volume_24h": 12835171290.975819,
            "volume_change_24h": -27.2565,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1027.svg"
        },
        "Litecoin": {
            "market_cap": 13033087641.531376,
            "market_cap_dominance": 0.5358,
            "percent_change_1h": -0.55548558,
            "percent_change_24h": -4.03499641,
            "percent_change_30d": -3.27371639,
            "percent_change_60d": 28.60957543,
            "percent_change_7d": -16.19722258,
            "percent_change_90d": 9.84674697,
            "price": 188.69084033896854,
            "volume_24h": 1440774641.0010827,
            "volume_change_24h": -2.966,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2.svg"
        },
        "XRP": {
            "market_cap": 43347710264.69304,
            "market_cap_dominance": 1.7793,
            "percent_change_1h": -0.57119589,
            "percent_change_24h": -4.05948627,
            "percent_change_30d": -14.80798436,
            "percent_change_60d": -1.81754961,
            "percent_change_7d": -14.56246839,
            "percent_change_90d": -18.80802102,
            "price": 0.9191826229944067,
            "volume_24h": 2151351651.1948657,
            "volume_change_24h": -16.9665,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/52.svg"
        },
        "Binance Coin": {
            "market_cap": 98133495072.37321,
            "market_cap_dominance": 4.0342,
            "percent_change_1h": -0.41010393,
            "percent_change_24h": -3.80968424,
            "percent_change_30d": 12.02760514,
            "percent_change_60d": 60.23940886,
            "percent_change_7d": -0.06316109,
            "percent_change_90d": 24.27827718,
            "price": 588.326257037351,
            "volume_24h": 2562480457.6982684,
            "volume_change_24h": 6.1276,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1839.svg"
        },
        "Dogecoin": {
            "market_cap": 26151087277.68979,
            "market_cap_dominance": 1.075,
            "percent_change_1h": -0.77504721,
            "percent_change_24h": -4.76418594,
            "percent_change_30d": -30.83810207,
            "percent_change_60d": -0.86674795,
            "percent_change_7d": -13.68111187,
            "percent_change_90d": -28.75201778,
            "price": 0.19765885435463662,
            "volume_24h": 815586620.3774753,
            "volume_change_24h": -18.8693,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/74.svg"
        },
        "Cardano": {
            "market_cap": 49587138040.48203,
            "market_cap_dominance": 2.0354,
            "percent_change_1h": -0.56268107,
            "percent_change_24h": -5.40079943,
            "percent_change_30d": -26.343927,
            "percent_change_60d": -27.80302953,
            "percent_change_7d": -20.4078975,
            "percent_change_90d": -47.33008643,
            "price": 1.488511106930191,
            "volume_24h": 1480526584.9385922,
            "volume_change_24h": -10.9767,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2010.svg"
        },
        "Solana": {
            "market_cap": 56938306937.81086,
            "market_cap_dominance": 2.3407,
            "percent_change_1h": -0.77809399,
            "percent_change_24h": -5.18450744,
            "percent_change_30d": -7.4012345,
            "percent_change_60d": 38.89732734,
            "percent_change_7d": -12.98943177,
            "percent_change_90d": 78.61564187,
            "price": 187.26763553615353,
            "volume_24h": 1461485348.8348415,
            "volume_change_24h": -17.404,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg"
        },
        "SHIBA INU": {
            "market_cap": 20830130687.08095,
            "market_cap_dominance": 0.8563,
            "percent_change_1h": -0.39885587,
            "percent_change_24h": -6.90815921,
            "percent_change_30d": -47.26502004,
            "percent_change_60d": 438.93996795,
            "percent_change_7d": -16.25751278,
            "percent_change_90d": 441.47135013,
            "price": 0.00003793808369353672,
            "volume_24h": 1821815767.8558776,
            "volume_change_24h": -22.351,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5994.svg"
        },
        "Terracoin": {
            "market_cap": 465710.45048292674,
            "market_cap_dominance": 0,
            "percent_change_1h": 1.39037097,
            "percent_change_24h": -0.14595579,
            "percent_change_30d": -45.3661357,
            "percent_change_60d": 43.79040862,
            "percent_change_7d": -6.80482722,
            "percent_change_90d": -26.80694074,
            "price": 0.020305315057316257,
            "volume_24h": 1130.00986686,
            "volume_change_24h": 134.7754,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/4.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/4.svg"
        },
        "Avalanche": {
            "market_cap": 23425369062.413357,
            "market_cap_dominance": 0.9624,
            "percent_change_1h": -1.6953734,
            "percent_change_24h": -4.30421393,
            "percent_change_30d": 58.49375379,
            "percent_change_60d": 59.36561093,
            "percent_change_7d": -22.35903002,
            "percent_change_90d": 137.38965537,
            "price": 104.65369732419897,
            "volume_24h": 1449937619.9255846,
            "volume_change_24h": 54.214,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5805.svg"
        },
        "Quark": {
            "market_cap": 795603.7934305269,
            "market_cap_dominance": 0,
            "percent_change_1h": -43.65905382,
            "percent_change_24h": -81.92871488,
            "percent_change_30d": -92.82801081,
            "percent_change_60d": -88.98236633,
            "percent_change_7d": 6.01324422,
            "percent_change_90d": -87.42376981,
            "price": 0.0028802410499633164,
            "volume_24h": 488.44578255,
            "volume_change_24h": -46.9249,
            "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/53.png",
            "graph": "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/53.svg"
        }
    })
    },[])
  // useEffect(() => {
  //   axios.get("https://99gz9lge5l.execute-api.us-east-2.amazonaws.com/default/getAllCurrencies2")
  //     .then(response => {
  //         return response.data
  //       })
  //       .then(data => {
  //         console.log(data)
  //         setCurrencyData(data)
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  // }, []);

  useEffect(() => {
    if(authState==='signedin' || authState==='signedup'){
      setRenderAuthenticator(false)
    }
  }, [authState]);

  const handleAuthStateChange = ((nextAuthState, authData) => {
    if (nextAuthState === AuthState.SignedIn) {
      console.log("user successfully signed in!");
      console.log("user data: ", authData);
    }
  });

return (
  <div className="App">
    <NavBar toggleSign={()=>setRenderAuthenticator(!renderAuthenticator)} signedIn={authState === AuthState.SignedIn && user}/>
    {authState === AuthState.SignedIn && user ? (
    <div >
        <div>Hello, {user.username} </div>
        <button onClick={()=> console.log(user)}> Print user info</button>
    </div>
  ) : null}
  
    <ScrollToTop/>
    <Routes>
      <Route exact path='/' element={<HomePage currencyData={currencyData}/>}/>
      <Route exact path='/converter' element={<Converter currencyData={currencyData}/>}/>
      <Route exact path='/wallet' element={<Wallet currencyData={currencyData} userData={user}/>}/>
      <Route exact path='/exchanges' element={<Exchanges/>}/>
    </Routes>
  
  { renderAuthenticator? 
  (
    <Modal show={renderAuthenticator} modalClosed={()=>setRenderAuthenticator(false) } modalType='Modal1'>
        <div className="amplifyAuthenticator">
          <AmplifyAuthenticator handleAuthStateChange={handleAuthStateChange}>
            <AmplifySignUp
              slot="sign-up"
              formFields={[
                { type: "username" },
                { type: "password" },
                { type: "email" }
              ]}
            />
          </AmplifyAuthenticator>
        </div>
    </Modal>
    
) : null}
</div>)
}

export default App;



