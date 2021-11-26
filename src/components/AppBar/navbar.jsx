import React from 'react';

import './navbar.scss';
import { Button } from '@mui/material';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import logo from'../../images/logoo.png';

const NavBar = (props) => {

    

    return (
     <div className="navbar">
         {/* <div><img src={logo} className='logo'/></div> */}
         <div className="cryptoWatcher"> CRYPTOWATCHER</div>
         <div><Button variant="contained">Price Converter</Button></div>
         <div><Button variant="contained">Show My Wallet</Button> </div>
         <div><Button variant="contained">Exchange Info</Button> </div>
         <div><Button variant="contained">Other Page</Button></div>
         <div><Button variant="contained" onClick={()=>props.toggleSign()}>SIGN IN</Button></div>
         {props.signedIn ? <div><AmplifySignOut/></div> : null}
     </div>
    );


}

export default NavBar;