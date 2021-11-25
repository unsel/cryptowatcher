import React,{useState,useEffect} from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/homepage/homepage.jsx';
import Modal from './components/Modal/modal.jsx';
import './App.scss';

import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Button } from '@mui/material';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [renderAuthenticator,setRenderAuthenticator] = useState(false);

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

return (
  <div className="App">
    <Button variant="contained" onClick={()=>setRenderAuthenticator(!renderAuthenticator)}>SIGN IN</Button>
    {authState === AuthState.SignedIn && user ? (
    <div >
        <div>Hello, {user.username} </div>
        <button onClick={()=> console.log(user)}> Click this button to print user info</button>
        <div className="amplifySignOut">
          <AmplifySignOut />
        </div>
    </div>
  ) : null}
  
    <BrowserRouter>
    <ScrollToTop/>
    <Routes>
      <Route exact path='/' element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  
  { authState !== AuthState.SignedIn && renderAuthenticator? 
  (
    <Modal show={renderAuthenticator} modalClosed={()=>setRenderAuthenticator() } modalType='Modal1'>
        <div className="amplifyAuthenticator">
          <AmplifyAuthenticator>
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



