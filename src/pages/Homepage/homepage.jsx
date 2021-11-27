
import React,{ useState , useEffect } from "react";
import './homepage.scss';
import Button from '@mui/material/Button';
import Select from 'react-select'
import {useNavigate} from 'react-router-dom';
const HomePage = () => {
  
    const [actionOption,setActionOption] = useState("buy")
    const [currencyOption,setCurrencyOption] = useState("bitcoin")

    const navigate = useNavigate();
    const actionOptions = [
        { value: 'buy', label: 'Buy' },
        { value: 'sell', label: 'Sell' },
    ]  
    const currencyOptions = [
        { value: 'bitcoin', label: 'Bitcoin' },
        { value: 'ethereum', label: 'Ethereum' },
        { value: 'doge', label: 'Doge' }
    ]
    const handleChange = (e,type) => {
        if(type == "action"){
            setActionOption(e.value)
        } else {
            setCurrencyOption(e.value)
        }
    }
    return(
        <div className="homePage">
           
            <div className="searchWrapper">
                <div className="actionChoice">
                    <Select 
                        options={actionOptions}
                        defaultValue={actionOptions[0]}
                        label
                        onChange={e => handleChange(e,"action")}
                        name="Action"
                        className="basic-multi-select"
                        classNamePrefix="select" />
                </div>
                <div className="currencyChoice">
                <Select 
                        options={currencyOptions}
                        defaultValue={currencyOptions[0]}
                        label
                        onChange={e => handleChange(e,"currency")}
                        name="Currencies"
                        className="basic-multi-select"
                        classNamePrefix="select" />
                </div>
                <div className="searchButton">
                <Button variant="contained" color="success" onClick={() => navigate('/result')}>
                    Search
                </Button>
                </div>
            </div>
            {actionOption}
            {currencyOption}
        </div>
      
    ) 
  }
  
export default HomePage;