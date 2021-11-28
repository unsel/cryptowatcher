
import React,{ useState , useEffect } from "react";
import './homepage.scss';
import Button from '@mui/material/Button';
import Select from 'react-select'
import CryptoTable from '../../components/CryptoTable/cryptotable';
import {useNavigate} from 'react-router-dom';
import icon1 from '../../images/1.png'
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