import React,{useState,useEffect} from 'react';

import './converter.scss';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import { Button } from '@mui/material';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import ConverterComponent from '../../components/Converter/converter';

const Converter = (props) => {

    const [leftOption,setLeftOption] = useState("bitcoin")
    const [rightOption,setRightOption] = useState("ethereum")
    const [converterCount,setConverterCount] = useState(1)
    const [leftAmount,setLeftAmount] = useState()
    const [rightAmount,setRightAmount] = useState()
    const [values,setValues] = useState({})
    const [logos,setLogos] = useState([])

    useEffect(() => {
        let valuesDict={'USD':1}
        let logosArr=['https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png']
        for (const [key,value] of Object.entries(props.currencyData)) {
            valuesDict[key] = value['price']
            logosArr.push(value['logo'])
        }
        console.log(valuesDict)

        setValues(valuesDict)
        setLogos(logosArr)
    }, [props.currencyData]);

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

    return (
     <div className="converter">
         <div className="convertText"> Convert Different Currencies</div>
         {logos.map((e, i) => <img alt="currenyLogo"  key={i} src={e} className="logoImage"/>)}
         {[...Array(converterCount)].map((e, i) => <ConverterComponent key={i} values={values}/>)}


      <div> 
          <Button variant="contained" onClick={()=>setConverterCount(converterCount+1)}>Add Converter</Button> &nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" onClick={()=>setConverterCount(converterCount-1)}>Remove Converter</Button>
          </div>
     </div>
    );
}
export default Converter;