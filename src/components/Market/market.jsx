import React from 'react';

import './navbar.scss';
import { Button } from '@mui/material';
import logo from'../../images/logoo.png';
import {Link} from 'react-router-dom';

const Market = (props) => {
    return (
     <div className="market">
         <div> ID  </div>
         <div> Price </div>
         <div> Volume</div>
         <div> Markets</div>
     </div>
    );
}
export default Market;