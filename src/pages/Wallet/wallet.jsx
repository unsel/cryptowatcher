import React,{useState,useEffect} from 'react';

import './wallet.scss';
import { Button,CircularProgress } from '@mui/material';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import Charts from '../../components/Charts/charts';


const Wallet = (props) => {

    const [openPieChart,setOpenPieChart] = useState(true)
    const [openDoughnut,setOpenDoughnut] = useState(false)
    const [fetching,setFetching] = useState(true)
    const [tempCoinWallet,setTempCoinWallet] = useState({})
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


      // Fetch wallet data when the user signs in
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

      //  Push fetched data to chart
      useEffect(()=>{
        if(Object.keys(temp).length !== 0){
          setTempCoinWallet(temp['Item']['wallet'])
          pushWalletInfoToChart()

        // let tempArr = [...coinOptions]
        // for (const [currName,currAmount] of Object.entries(temp['Item']['wallet'])) {
        //   let upperedCurrName =  currName.charAt(0).toUpperCase() + currName.slice(1)
        //   tempArr.splice(tempArr.findIndex(v => v.value === upperedCurrName), 1);
        //   console.log("temparr=",tempArr)
        // }
        // setCoinOptions(tempArr)

        } 
      },[temp])

      const pushWalletInfoToChart = () => {
        let count = Object.entries(temp['Item']['wallet']).length
        let labels=[]
        let datasets =  [{
          label: ' USD Equivalent',
          data: [], 
          backgroundColor: backgroundColors.slice(0,count),
          borderColor: borderColors.slice(0,count),
          borderWidth: 1
        }]
  
        let dataArray = []
        let tempArr = [...coinOptions]
        for (const [currName,currAmount] of Object.entries(temp['Item']['wallet'])) {
          let upperedCurrName =  currName.charAt(0).toUpperCase() + currName.slice(1)
          tempArr.splice(tempArr.findIndex(v => v.value === upperedCurrName), 1);
          labels.push(upperedCurrName)
          dataArray.push(currAmount * props.currencyData[upperedCurrName]['price'])
        }
        datasets[0]['data'] = dataArray
        
        setData({
          labels: labels,
          datasets: datasets,
        })

        setCoinOptions(tempArr)

      }

      const backgroundColors =  [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(169, 169, 169, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(34, 139, 34, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ]
      const borderColors =  [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(169, 169, 169, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(34, 139, 34, 1)',
        'rgba(255, 159, 64, 1)',
      ]

    const fetchWallet = () => {
      let sub = props.userData['attributes']['sub']
      axios.get(`https://2jbjhydie7.execute-api.us-east-2.amazonaws.com/items/${sub}`)
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
      arr.splice(arr.findIndex(v => v.value === e), 1);
      setCoinOptions(arr)
      let tempDict = {...tempCoinWallet}
      tempDict[e]=0
      setTempCoinWallet(tempDict)
    }

    const removeOption = (key) => {
      let arr =[...coinOptions]
      arr.push({'value':key,'label':key})
      setCoinOptions(arr)
      let tempDict = {...tempCoinWallet}
      delete tempDict[key]
      setTempCoinWallet(tempDict)
    }

    const handleAmountChange = (e,key) =>  {
      let tempDict = {...tempCoinWallet}
      if(e.target.value === ''){e.target.value = 0}
      tempDict[key] = parseInt(e.target.value)
      setTempCoinWallet(tempDict)
    }

    const applyChanges = () => {
      
      let count = Object.entries(tempCoinWallet).length
      let labels=[]
      let datasets =  [{
        label: ' USD Equivalent',
        data: [], 
        backgroundColor: backgroundColors.slice(0,count),
        borderColor: borderColors.slice(0,count),
        borderWidth: 1
      }]

      let dataArray = []
      for (const [currName,currAmount] of Object.entries(tempCoinWallet)) {
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

    const fetchAll = () => {
      axios.get('https://2jbjhydie7.execute-api.us-east-2.amazonaws.com/items')
          .then(response => {
              return response.data
            })
            .then(data => {
              console.log(data)
            }).then(()=>{
              setFetching(false)
            })
            .catch(error => {
              console.log(error)
          })

    }
    
    const saveChanges = () => {
      applyChanges()
      let sub = props.userData['attributes']['sub']
      let payload = {}
      payload['id'] = sub
      let tempData = {}
      for (const [key, value] of Object.entries(tempCoinWallet)) {
        tempData[key] = value
      }
     
      payload['wallet'] = tempData
     console.log("this is payload before send",payload)
      axios.put("https://2jbjhydie7.execute-api.us-east-2.amazonaws.com/items",payload)
        .then(response => {
            return response.data
          })
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
    }

    return (
     <div className="wallet">
         <div> WELCOME TO THE Wallet PAGE</div>
      
         <div>
        { openPieChart? <button onClick={()=>setOpenPieChart(false)}>CLOSE PIE</button> : <button onClick={()=>setOpenPieChart(true)}>OPEN PIE </button>}
        { openDoughnut? <button onClick={()=>setOpenDoughnut(false)}>CLOSE DOUGHNUT</button> : <button onClick={()=>setOpenDoughnut(true)}>OPEN DOUGHNUT </button>} 
          </div>
         <div><button onClick={()=>console.log(coinOptions)}> print coinOPtions</button></div>
         <div><button onClick={()=>console.log(tempCoinWallet)}> print tempCoinWallet data</button></div>
         
         <div>
            <button onClick={()=> applyChanges()}> APPLY</button>
            <button onClick={()=> saveChanges()}> SAVE</button>
            {/* <button onClick={()=> pushWalletInfoToChart()}> RESET</button> */}
         </div>
         {/* <div><button onClick={()=> setCoinCount(coinCount+1)}> Add CoinType</button></div> */}
         
          
          <div className="coinOption">
            <Select 
                options={coinOptions}
                // defaultValue={currencyOptions[0]}
                label
                onChange={e => handleOptionChange(e.value)}
                name="Action"
                className="basic-multi-select"
                classNamePrefix="select" />
          </div>

        <div className="walletInputParent">
          { tempCoinWallet ? Object.entries(tempCoinWallet).map( ([key, value]) => 
           <div key={key} className="walletInput" >
            <TextField
                id="outlined-number"
                label= {key}
                value={value}
                placeholder="0"
                onChange={(e)=>handleAmountChange(e,key)}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <button onClick={()=>removeOption(key)}>Remove</button>
            </div>
          
          ): null}
          </div>
          
         <div className="chartDiv">{fetching ? <CircularProgress color="secondary" /> :<Charts pie={openPieChart} doughnut={openDoughnut} data={data}/>}</div>
     </div>
    );
}
export default Wallet;