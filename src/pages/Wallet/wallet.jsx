import React,{useState,useEffect} from 'react';

import './wallet.scss';
import { Button } from '@mui/material';
import axios from 'axios';
import Charts from '../../components/Charts/charts';


const Wallet = (props) => {

    const [charts,setCharts] = useState(['doughnut','pie'])
    const [fetching,setFetching] = useState(true)
    const [temp,setTemp] = useState({})
    const [data,setData] = useState({
        labels: ['Bitcoin', 'Ethereum', 'Solana', 'XRP', 'ShibaINU', 'Litecoin'],
        datasets: [
          {
            label: '# of Votes',
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

    const pushWalletInfo = () => {
      let count = Object.entries(temp['Item']['wallet']).length
      let labels=[]
      let index = 1
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

    return (
     <div className="wallet">
         <div> WELCOME TO THE Wallet PAGE</div>
         <div><button onClick={()=>fetchWallet()}> fetch wallets</button></div>
         <div><button onClick={()=>saveWallet()}> save wallets</button></div>
         <div><button onClick={()=>console.log(temp)}> print temp data</button></div>
         <div><button onClick={()=>console.log(props.userData)}> print user data</button></div>
         <div><button onClick={()=>console.log(props.currencyData)}> print currency data</button></div>
         <div><button onClick={()=> pushWalletInfo()}> PUSH</button></div>
        
         <Charts charts={charts} data={data}/>
     </div>
    );
}
export default Wallet;