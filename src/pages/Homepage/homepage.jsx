
import React from "react";
import './homepage.scss';
import CryptoTable from '../../components/CryptoTable/cryptotable';
const HomePage = (props) => {
  
    
    return(
        <div className="homePage">
           
           <div>
                <CryptoTable currencyData={props.currencyData}/>
           </div>
           
        </div>
      
    ) 
  }
  
export default HomePage;