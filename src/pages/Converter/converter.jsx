import React,{useState,useEffect} from 'react';

import './converter.scss';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
const Converter = (props) => {

    const [leftOption,setLeftOption] = useState("bitcoin")
    const [rightOption,setRightOption] = useState("ethereum")
    const [leftAmount,setLeftAmount] = useState()
    const [rightAmount,setRightAmount] = useState()
    const [lastModified,setLastModified] = useState('left')
    const [values,setValues] = useState({})

    useEffect(() => {
        setValues({'ethereum':5,'bitcoin':1})
    }, []);

    const currencyOptions = [
        { value: 'usd', label: 'USD' },
        { value: 'euro', label: 'Euro' },
        { value: 'gold', label: 'Gold' },
        { value: 'silver', label: 'Silver' },
        { value: 'bitcoin', label: 'Bitcoin' },
        { value: 'ethereum', label: 'Ethereum' },
        { value: 'dogecoin', label: 'Dogecoin' }
    ]  

    const handleOptionChange = (e,type) => {
        if(type == "left"){
            setLeftOption(e.value)
        } else {
            setRightOption(e.value)
        }
    }
    const handleAmountChange = (e,type) => {
        if(type == "left"){
            setLastModified('left')
            setLeftAmount(e.target.value)
            setRightAmount(e.target.value*(values[rightOption]/values[leftOption]))
            console.log("left amount is"+leftAmount+" lft*rght/left = "+ e.target.value*(values[rightOption]/values[leftOption]))
            
        } else {
            console.log("right amount changed")
            setLastModified('right')
            setRightAmount(e.target.value)
            setLeftAmount(e.target.value*(values[leftOption]/values[rightOption]))
        }
    }

    // const changeSides = () =>{
    //     const leftOpt = leftOption
    //     const leftAmnt = leftAmount
    //     const rightOpt = rightOption
    //     const rightAmnt = rightAmount
    // }

    return (
     <div className="converter">
         <div> WELCOME TO THE Converter PAGE</div>

         
        <div class="leftConverter">
            <div className="currencyChoice">
                <Select 
                    options={currencyOptions}
                    defaultValue={currencyOptions[4]}
                    label
                    onChange={e => handleOptionChange(e,"left")}
                    name="Action"
                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div>
            <TextField
                id="outlined-number"
                label="Number"
                value={leftAmount}
                placeholder="0"
                onChange={(e)=>handleAmountChange(e,'left')}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
        <ThreeSixtyIcon fontSize="large" className="threesixtyIcon"/>
        <div class="rightConverter">
            <div className="currencyChoice">
                <Select 
                    options={currencyOptions}
                    defaultValue={currencyOptions[5]}
                    label
                    onChange={e => handleOptionChange(e,"right")}
                    name="Action"
                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div>
            <TextField
            id="outlined-number"
            label="Number"
            value={rightAmount}
            placeholder="0"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(e)=>handleAmountChange(e,'right')}
            />
        </div>
         

       {leftAmount} &nbsp;&nbsp;&nbsp;&nbsp;
       {rightAmount}
     </div>
    );
}
export default Converter;