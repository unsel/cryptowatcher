import React,{useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './cryptotable.scss';


const DataTable = () => {

    const [rows,setRows] = useState([])

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'logo',headerName: 'Logo',width: 70, editable: true, renderCell: (params) => <img className="currencyLogo" src={params.value} />},
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'price', headerName: 'Price ($)', width: 130 },
        { field: 'dailyChange', headerName: '24h%', width: 90 },
        { field: 'marketCap', headerName: 'Market Cap', width: 180 },
        { field: 'dailyVolume', headerName: 'Volume(24h)($)', width: 180 },
        { field: 'circulatingSupply', headerName: 'Circulating Supply', width: 150 },
        { field: 'graph',headerName: 'Last 7 Days',width: 190,editable: true,renderCell: (params) => <img src={params.value} />},
    ];


    useEffect(() => {
        setRows([{ id: 1, name: 'Bitcoin', price:57569,dailyChange: +1.47,marketCap:"1,038,645,607,815",dailyVolume:"31,315,223,996",circulatingSupply:"18,884,712", logo:"https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",graph:"https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg"},
                { id: 2, name: 'Ethereum', price:58000,dailyChange: -1.47,marketCap:"1,038,645,607,812",dailyVolume:"42,353,535,535",circulatingSupply:"17,333", logo:"https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",graph:"https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg"}])
    }, []);

  return (
    <div style={{ height: 450, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={90}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default DataTable;