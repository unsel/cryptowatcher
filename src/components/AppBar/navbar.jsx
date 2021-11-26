import React from 'react';

import './navbar.scss';
import { Button } from '@mui/material';
import logo from'../../images/logoo.png';

const NavBar = (props) => {

    

    return (
     <div className="navbar">
         {/* <div><img src={logo} className='logo'/></div> */}
         <div className="cryptoWatcher"> CRYPTOWATCHER</div>
         <div> Page1</div>
         <div> Page2</div>
         <div> Page3</div>
         <div> Page4</div>
         <div><Button variant="contained" onClick={()=>props.toggleSign()}>SIGN IN</Button></div>
     </div>
    );


}

export default NavBar;