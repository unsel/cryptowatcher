import React,{useState} from 'react';

import './wallet.scss';
import { Button } from '@mui/material';

import Charts from '../../components/Charts/charts';


const Wallet = (props) => {

    const [charts,setCharts] = useState(['doughnut','pie'])

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
    return (
     <div className="wallet">
         <div> WELCOME TO THE Wallet PAGE</div>
         <Charts charts={charts} data={data}/>
         
     </div>
    );
}
export default Wallet;