import React,{useState,useEffect} from 'react';

import './converter.scss';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
const Converter = (props) => {

    const [leftOption,setLeftOption] = useState("bitcoin")
    const [rightOption,setRightOption] = useState("ethereum")
    const [leftAmount,setLeftAmount] = useState()
    const [rightAmount,setRightAmount] = useState()
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
        if(type === "left"){
            setLeftOption(e.value)
        } else {
            setRightOption(e.value)
        }
    }
    const handleAmountChange = (e,type) => {
        if(type === "left"){
            setLeftAmount(e.target.value)
            setRightAmount(e.target.value*(values[rightOption]/values[leftOption]))
            
        } else {
            setRightAmount(e.target.value)
            setLeftAmount(e.target.value*(values[leftOption]/values[rightOption]))
        }
    }

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