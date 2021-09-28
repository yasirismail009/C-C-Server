import React,{useEffect} from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Quote from "components/Typography/Quote.jsx";
import Muted from "components/Typography/Muted.jsx";
import Primary from "components/Typography/Primary.jsx";
import Info from "components/Typography/Info.jsx";
import Success from "components/Typography/Success.jsx";
import Warning from "components/Typography/Warning.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {FormControl} from '@mui/material';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import App from "../../message/App";
import axios from "axios";

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
function icons(props) {
  const [devices, setDevices] = React.useState('');
  const [deviceValue, setDeviceValue] = React.useState('');
 const [photos, setPhotos] = React.useState('');



  useEffect (()=>{
    axios.get('/device/?page=1')
    .then((res)=>{
      setDevices(res.data.data)
      PhotosData(res.data.data.devices_data[0].device_key)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])
console.log(devices)
  const handleChange = (event) => {
    setDeviceValue(event);
  };

  function PhotosData (value){
    axios.get('/picture/?page=1', {
      headers:{
        'x-api-key':value
      }
    }
    )
    .then((res)=>{
      setPhotos(res.data.data)
    })
    .catch((err)=>{
      alert(err)
    })
  }

  const { classes } = props;
  return (
    <Card>
      <CardHeader color="primary">
      <div className="flex flex-row">
             <div> <h4 ><b>Messages</b></h4>
            <p>
              All Messages found on the machines
            </p>
            </div>
            {devices.devices_data === null || devices.devices_data === undefined ? null :
            <div>   
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label" >Devices</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={deviceValue === '' ? devices.devices_data[0].device_name : deviceValue }
          label="Age"
         onChange={(e)=>{handleChange(e.target.value,)}}
        >
       
       <option selected disabled hidden value={devices.devices_data[0].device_name}>{devices.devices_data[0].device_name}</option> 
       
       { devices.devices_data.map((val, key)=>(
           <MenuItem onClick={()=>{ PhotosData(val.device_key)}} value={val.device_name} key={key}>{val.device_name}</MenuItem>
         ))} 
       
         
        </Select>
      </FormControl> 
            </div> }
            </div>
      </CardHeader>
      <CardBody>
     <App/>
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(icons);
