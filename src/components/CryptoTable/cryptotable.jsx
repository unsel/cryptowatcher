import React,{useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './cryptotable.scss';

const DataTable = (props) => {

    const [rows,setRows] = useState([])
    const [fetching,setFetching] = useState(true)
    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'logo',headerName: 'Logo',width: 80, editable: true, renderCell: (params) => <img alt="currenyLogo" className="currencyLogo" src={params.value} />},
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'price', headerName: 'Price ', width: 120 },
        { field: 'percent_change_24h', headerName: 'Daily Change %', width: 130 },
        { field: 'percent_change_30d', headerName: '30d Change %', width: 160 },
        { field: 'market_cap', headerName: 'Market Cap', width: 200 },
        { field: 'volume_24h', headerName: 'Daily Volume %', width: 160 },
        { field: 'volume_change_24h', headerName: 'Daily Change %', width: 130 },
        { field: 'graph',headerName: 'Last 7 Days',width: 190,editable: true,renderCell: (params) => <img alt="currenyGraph" src={params.value} />},
    ];
   
    useEffect(() => {
      setFetching(true)
      const ourKeys = ['name', 'price','percent_change_24h','percent_change_30d','market_cap','volume_24h','volume_change_24h','logo','graph']
      if(Object.keys(props.currencyData).length !== 0) {
        let currencyDataList=[]
        let id=1
        for (const [currName, currData] of Object.entries(props.currencyData)) {
          let temp={}
          temp['id'] = id
          id = id+1
          for (const [key,value] of Object.entries(currData)) {
            temp['name'] = currName
            if(ourKeys.includes(key)){
              if(['id','logo','name','graph'].includes(key)){
                temp[key] = value
              } else {
                temp[key] = value
                // temp[key] =value.toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }

              if (['price','market_cap','volume_24h'].includes(key)){
                temp[key] ='$' + temp[key]
              }
              
            }
          }
          currencyDataList.push(temp)
        }
    
       Promise.resolve(setRows(currencyDataList)).then(()=>setFetching(false))
      }
      
    }, [props.currencyData]);

  return (
      <div style={{ height: 850, width: '100%' }}>
        <DataGrid
          loading={fetching}
          rows={rows}
          columns={columns}
          rowHeight={90}
          pageSize={15}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
  );
}

export default DataTable;