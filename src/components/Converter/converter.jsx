import React,{useState,useEffect} from 'react';

import './converter.scss';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

const Converter = (props) => {

    const [leftOption,setLeftOption] = useState("USD")
    const [rightOption,setRightOption] = useState("USD")
    const [leftAmount,setLeftAmount] = useState()
    const [rightAmount,setRightAmount] = useState()
    const [values,setValues] = useState({'USD':1 })

    useEffect(() => {
        setValues(props.values)
    }, [props.values]);

    const currencyOptions = [
        { value: 'USD', label: 'USD'},
        { value: 'Bitcoin', label: 'Bitcoin' },
        { value: 'Ethereum', label: 'Ethereum' },
        { value: 'Litecoin', label: 'Litecoin'},
        { value: 'Binance Coin', label: 'Binance Coin'},
        { value: 'XRP', label: 'XRP' },
        { value: 'Cardano', label: 'Cardano' },
        { value: 'Dogecoin', label: 'Dogecoin' },
        { value: 'Solana', label: 'Solana' },
        { value: 'SHIBA INU', label: 'SHIBA INU'},
        { value: 'Terracoin', label: 'Terracoin'},
        { value: 'Avalanche', label: 'Avalanche' },
        { value: 'Quark', label: 'Quark' }
    ]  

    const handleOptionChange = (e,type) => {
        if(type === "left"){
            setLeftOption(e.value)
        } else {
            setRightOption(e.value)
        }
        setRightAmount(leftAmount*(values[e.value]/values[rightOption]).toFixed(5))
    }
    const handleAmountChange = (e,type) => {
        if(type === "left"){
            setLeftAmount(e.target.value)
            setRightAmount(e.target.value*(values[leftOption]/values[rightOption]).toFixed(5))
            
        } else {
            setRightAmount(e.target.value)
            setLeftAmount(e.target.value*(values[rightOption]/values[leftOption]).toFixed(5))
        }
    }

    return (
     <div className="converter">
        <div className="leftConverter">
            <div className="currencyChoice">
                <Select 
                    options={currencyOptions}
                    defaultValue={currencyOptions[0]}
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
        <div className="rightConverter">
            <div className="currencyChoice">
                <Select 
                    options={currencyOptions}
                    defaultValue={currencyOptions[0]}
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
    
    
     </div>
    );
}
export default Converter;