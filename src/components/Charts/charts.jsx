
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie,Doughnut } from 'react-chartjs-2';
import './charts.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = (props) => {
     
    return (
        <div>
            <div className="chartWrapper">
                {props.pie? <Pie
                    data={props.data} 
                    width={500} height={500} options={{ maintainAspectRatio: false ,responsive:false }}
                /> : null}
            </div>

            <div className="chartWrapper">
                {props.doughnut ? <Doughnut
                    data={props.data} 
                    width={500} height={500} options={{ maintainAspectRatio: false ,responsive:false }}
                /> : null}
            </div>
        </div>
        
    );
  }
  
export default Chart;