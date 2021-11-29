import React,{useState,useEffect} from 'react';

import './converter.scss';

import { Button } from '@mui/material';

import ConverterComponent from '../../components/Converter/converter';

const Converter = (props) => {

   
    const [converterCount,setConverterCount] = useState(1)
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