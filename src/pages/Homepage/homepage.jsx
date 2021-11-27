
import React,{ useState , useEffect } from "react";
import './homepage.scss';
import Button from '@mui/material/Button';
import Select from 'react-select'
import {useNavigate} from 'react-router-dom';
import icon1 from '../../images/1.png'
const HomePage = () => {
  
    
    return(
        <div className="homePage">
           
           <div>
               <div>
                   <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"/>
                   
                   15000 DOLLARS
                   <img src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg"/>
                   </div>
           </div>
           
        </div>
      
    ) 
  }
  
export default HomePage;