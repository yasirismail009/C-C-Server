import React,{useEffect} from "react";
import { Link } from "react-router-dom";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";

// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import ExploreIcon from '@material-ui/icons/Explore';
import ContactsIcon from '@material-ui/icons/Contacts';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {FormControl} from '@mui/material';
import Select from '@mui/material/Select';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function Dashboard (props) {
  const [value, setValue] = React.useState('');
  const [devices, setDevices] = React.useState('');
  const [deviceValue, setDeviceValue] = React.useState('');
 const [stats, setStats] = React.useState('');



  useEffect (()=>{
    axios.get('/device/?page=1')
    .then((res)=>{
      setDevices(res.data.data)
      StatsData(res.data.data.devices_data[0].device_key)
    })
    .catch((err)=>{
      // alert(err)
    })
  },[])
  const handleChange1 = (event) => {
    setDeviceValue(event);
  };

  function StatsData (value){
    axios.get('/reporting/?page=1', {
      headers:{
        'x-api-key':value
      }
    }
    )
    .then((res)=>{
      setStats(res.data.data)
    })
    .catch((err)=>{
      // alert(err)
    })
  }

 function handleChange  (event, value)  {
    setValue({ value });
  };

  function handleChangeIndex (index) {
    setValue({ value: index });
  };

    const { classes } = props;
    return (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
        {devices.devices_data === null || devices.devices_data === undefined ? null :
            <div style={{backgroundColor:'#11b8cc' , padding:10 , borderRadius:10}}>   
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label" >Devices</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={deviceValue === '' ? devices.devices_data[0].device_name : deviceValue }
          label="Age"
         onChange={(e)=>{handleChange1(e.target.value,)}}
        >
       
       <option selected disabled hidden value={devices.devices_data[0].device_name}>{devices.devices_data[0].device_name}</option> 
       
       { devices.devices_data.map((val, key)=>(
           <MenuItem onClick={()=>{ StatsData(val.device_key)}} value={val.device_name} key={key}>{val.device_name}</MenuItem>
         ))} 
       
         
        </Select>
      </FormControl> 
            </div> }
          </GridItem>
          <GridItem  xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon><InsertPhotoIcon/></Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Total Images</p>
                <h3 className={classes.cardTitle}>
                  {stats.pictures_count}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                
                    <ExploreIcon />
             
                  <Link to="/admin/photos" >
                    Explore More
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <AudiotrackIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Total Audio Recorded</p>
                <h3 className={classes.cardTitle}>{stats.voice_recording_count}</h3>
              </CardHeader>
              <CardFooter stats>
              <div className={classes.stats}>
                
                <ExploreIcon />
         
              <Link to="/admin/audio" >
                Explore More
              </Link>
            </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon><ContactsIcon/></Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Contacts</p>
                <h3 className={classes.cardTitle}>{stats.contacts_count}</h3>
              </CardHeader>
              <CardFooter stats>
              <div className={classes.stats}>
                
                <ExploreIcon />
         
              <Link to="/admin/contacts" >
                Explore More
              </Link>
            </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <MailOutlineIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Messages</p>
                <h3 className={classes.cardTitle}>{stats.sms_count}</h3>
              </CardHeader>
              <CardFooter stats>
              <div className={classes.stats}>
                
                <ExploreIcon />
         
              <Link to="/admin/messages" >
                Explore More
              </Link>
            </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Messages Recieved</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Photos Captures</h4>
                <p className={classes.cardCategory}>
                 Yearly Count
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer> */}
      </div>
    );
  }




export default withStyles(dashboardStyle)(Dashboard);
