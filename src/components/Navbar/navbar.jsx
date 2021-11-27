import React from 'react';

import './navbar.scss';
import { Button } from '@mui/material';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import logo from'../../images/logoo.png';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
    return (
     <div className="navbar">
         {/* <div><img src={logo} className='logo'/></div> */}
         <Link to='/'><div className="cryptoWatcher"> CRYPTOWATCHER</div></Link>
         <Link to='/converter'><div><Button variant="contained">Price Converter</Button></div></Link>
         <Link to='/wallet'><div><Button variant="contained">Show My Wallet</Button> </div></Link>
         <Link to='/exchange'><div><Button variant="contained">Exchange Info</Button> </div></Link> 
         <Link to='/other'><div><Button variant="contained">Other Page</Button></div></Link>
         <div><Button variant="contained" onClick={()=>props.toggleSign()}>SIGN IN</Button></div>
         {props.signedIn ? <div><AmplifySignOut/></div> : null}
     </div>
    );
}

export default NavBar;