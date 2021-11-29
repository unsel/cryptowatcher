import React from 'react';

import './navbar.scss';
import { Button } from '@mui/material';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import {Link} from 'react-router-dom';

import axios from 'axios';
const NavBar = (props) => {
    const handleFetch = () => {
        
        axios.get("https://99gz9lge5l.execute-api.us-east-2.amazonaws.com/default/getAllCurrencies2")
        .then(response => {
            return response.data
         })
         .then(data => {
            console.log(data)
         })
         .catch(error => {
            console.log(error)
         })
    }
    
    return (
     <div className="navbar">
         {/* <div><img src={logo} className='logo'/></div> */}
         <button onClick={()=>handleFetch()}>CLICK TO FETCH</button>
         <Link to='/'><div className="cryptoWatcher"> CRYPTOWATCHER</div></Link>
         <Link to='/converter'><div><Button variant="contained">Price Converter</Button></div></Link>
         <Link to='/wallet'><div><Button variant="contained">Show My Wallet</Button> </div></Link>
         <Link to='/exchange'><div><Button variant="contained">Exchange Info</Button> </div></Link> 
         <Link to='/other'><div><Button variant="contained">Other Page</Button></div></Link>
         {props.signedIn ? <div><AmplifySignOut/></div> : <div><Button variant="contained" onClick={()=>props.toggleSign()}>SIGN IN</Button></div>}
     </div>
    );
}

export default NavBar;