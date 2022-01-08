import React from 'react';
import './navbar.scss';
import { Button } from '@mui/material';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    return (
     <div className="navbar">
         <Link to='/'><div className="cryptoWatcher"> CRYPTOWATCHER</div></Link>
         <Link to='/converter'><div><Button variant="contained">Price Converter</Button></div></Link>
         <Link to='/wallet'><div><Button variant="contained">Show My Wallet</Button> </div></Link>
         {props.signedIn ? <div><AmplifySignOut/></div> : <div><Button variant="contained" onClick={()=>props.toggleSign()}>SIGN IN</Button></div>}
     </div>
    );
}

export default NavBar;