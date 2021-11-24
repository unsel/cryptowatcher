import React,{useState,useEffect} from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/homepage/homepage.jsx';
import './App.css';

import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  const [renderAuthenticator,setRenderAuthenticator] = useState(true);

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

return (
  <div className="App">
    <button onClick={()=>setRenderAuthenticator(!renderAuthenticator)}> SIGN TOGGLE</button>
    <BrowserRouter>
    <ScrollToTop/>
    <Routes>
      <Route exact path='/' element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  {authState === AuthState.SignedIn && user ? (
    <div >
        <div>Hello, {user.username}</div>
        <div className="amplifySignOut">
          <AmplifySignOut />
        </div>
    </div>
  ) : null}

  { authState !== AuthState.SignedIn && renderAuthenticator? 
  (
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
) : null}
</div>)
}

export default App;



