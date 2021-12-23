import React,{useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './cryptotable.scss';

const DataTable = (props) => {

    const [rows,setRows] = useState([])
    const [fetching,setFetching] = useState(true)
    var regex = /[.,$\s]/g;
    const customComparator = (inputField) => {
      const inputComparator = (v1, v2, param1, param2) => {
        return(
          param1.api.getCellValue(param1.id, inputField).replace(regex, '') -
          param2.api.getCellValue(param2.id, inputField).replace(regex, '')
          )
      }
      return inputComparator
    }
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'logo',headerName: 'Logo',width: 80, editable: true, renderCell: (params) => <img alt="currencyLogo" className="currencyLogo" src={params.value} />},
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'price', headerName: 'Price ', width: 120 ,
          sortComparator: customComparator('price')
        },
        { field: 'percent_change_24h', headerName: 'Daily Change %', width: 130 ,
          sortComparator: customComparator('percent_change_24h')},
        { field: 'percent_change_30d', headerName: '30d Change %', width: 160 ,
          sortComparator: customComparator('percent_change_30d')},
        { field: 'market_cap', headerName: 'Market Cap', width: 200 ,
          sortComparator: customComparator('market_cap')},
        { field: 'volume_24h', headerName: 'Daily Volume %', width: 160 ,
          sortComparator: customComparator('volume_24h')},
        { field: 'volume_change_24h', headerName: 'Daily Change %', width: 130 ,
          sortComparator: customComparator('volume_change_24h')},
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
              } else if  (['market_cap','volume_24h'].includes(key)){
                temp[key] =value.toFixed(6).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                temp[key] = value.toFixed(5).toString()
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