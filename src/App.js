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
import StaticData from './staticdata.json';

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
  const [requestTrial,setRequestTrial] = useState(true)
  

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);
    // useEffect(()=>{
    //   setCurrencyData(StaticData)
    // },[])
  useEffect(() => {
    axios.get("https://99gz9lge5l.execute-api.us-east-2.amazonaws.com/default/getAllCurrencies2")
      .then(response => {
          return response.data
        })
        .then(data => {
          console.log(data)
          setCurrencyData(data)
        })
        .catch(error => {
          console.log(error)
          setRequestTrial(!requestTrial)
        })
  }, [requestTrial]);

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



