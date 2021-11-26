import React from 'react';

import './exchange.scss';
import { Button } from '@mui/material';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import logo from'../../images/logoo.png';

const Exchange = (props) => {
    return (
     <div className="exchange">
         <div> LOGO   + NAME</div>
         <div> Notice</div>
         <div> Volume </div>
         <div> URLs</div>
         <div> Markets ? </div>
     </div>
    );
}
export default Exchange;