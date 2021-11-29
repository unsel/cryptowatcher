import React,{useState,useEffect} from 'react';

import './wallet.scss';
import { Button,CircularProgress } from '@mui/material';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import Charts from '../../components/Charts/charts';


const Wallet = (props) => {

    const [charts,setCharts] = useState(['doughnut','pie'])
    const [fetching,setFetching] = useState(true)
    const [coinWallet,setCoinWallet] = useState([{'name':'Solana','amount':15}])
    const [coinOptions,setCoinOptions] = useState(
      [
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
    )
    const [temp,setTemp] = useState({})
    const [data,setData] = useState({
        labels: ['Bitcoin', 'Ethereum', 'Solana', 'XRP', 'ShibaINU', 'Litecoin'],
        datasets: [
          {
            label: 'USD Equivalent',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      })



      useEffect(() => {
        setFetching(true)
        if(props.userData){
          let sub = props.userData['attributes']['sub']
          axios.get(`https://2jbjhydie7.execute-api.us-east-2.amazonaws.com/items/${sub}`)
          .then(response => {
              return response.data
            })
            .then(data => {
              setTemp(data)
              console.log(data)
            }).then(()=>{
              setFetching(false)
            })
            .catch(error => {
              console.log(error)
          })
        }
      }, [props.userData]);

      useEffect(()=>{
        if(Object.keys(temp).length !== 0){
          pushWalletInfo()
        } 
      },[temp])

      const pushWalletInfo = () => {
        let count = Object.entries(temp['Item']['wallet']).length
        let labels=[]
        // let index = 1
        let datasets =  [{
          label: ' USD Equivalent',
          data: [], 
          backgroundColor: backgroundColors.slice(0,count),
          borderColor: borderColors.slice(0,count),
          borderWidth: 1
        }]
  
        let dataArray = []
        for (const [currName,currAmount] of Object.entries(temp['Item']['wallet'])) {
          let upperedCurrName =  currName.charAt(0).toUpperCase() + currName.slice(1)
          labels.push(upperedCurrName)
          dataArray.push(currAmount * props.currencyData[upperedCurrName]['price'])
        }
        datasets[0]['data'] = dataArray
        
        setData({
          labels: labels,
          datasets: datasets,
        })
      }

      const backgroundColors =  [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ]
      const borderColors =  [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ]

    const fetchWallet = () => {
      axios.get("https://2jbjhydie7.execute-api.us-east-2.amazonaws.com/items")
        .then(response => {
            return response.data
          })
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
    };

    

    const saveWallet = () => {
      const tempWallet = { 
        "id":"five",
        "wallet": {
          "Bitcoin" : 2,
          "Ethereum": 120,
          "Litecoin": 300,
          "Solana": 500
        }     
      };
      axios.put("https://2jbjhydie7.execute-api.us-east-2.amazonaws.com/items",tempWallet)
        .then(response => {
            return response.data
          })
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
    };

    const handleOptionChange = (e) => {
      let arr =[...coinOptions]
      arr.splice(arr.findIndex(v => v.value === e.value), 1);
      setCoinOptions(arr)
      setCoinWallet([...coinWallet].push({'name':e.value,'amount':0}))
    }

    const handleAmountChange = (e,i) =>  {
      let arr = [...coinWallet]
      arr[i]['amount'] = e.target.value
      setCoinWallet(arr)
    }

    return (
     <div className="wallet">
         <div> WELCOME TO THE Wallet PAGE</div>
         <div><button onClick={()=>fetchWallet()}> fetch wallets</button></div>
         <div><button onClick={()=>saveWallet()}> save wallets</button></div>
         <div><button onClick={()=>console.log(temp)}> print temp data</button></div>
         <div><button onClick={()=>console.log(props.userData)}> print user data</button></div>
         <div><button onClick={()=>console.log(props.currencyData)}> print currency data</button></div>
         <div><button onClick={()=> pushWalletInfo()}> PUSH</button></div>
         {/* <div><button onClick={()=> setCoinCount(coinCount+1)}> Add CoinType</button></div> */}
         
          
          <div className="coinOption">
            <Select 
                options={coinOptions}
                // defaultValue={currencyOptions[0]}
                label
                onChange={e => handleOptionChange(e)}
                name="Action"
                className="basic-multi-select"
                classNamePrefix="select" />
          </div>

          { coinWallet ? coinWallet.map((e, i) => 
           <div key={i} >
            <TextField
                id="outlined-number"
                label= {e.name}
                value={e.amount}
                placeholder="0"
                onChange={(k)=>handleAmountChange(k,i)}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            </div>
          ): null}
          
         <div className="chartDiv">{fetching ? <CircularProgress color="secondary" /> :<Charts charts={charts} data={data}/>}</div>
     </div>
    );
}
export default Wallet;