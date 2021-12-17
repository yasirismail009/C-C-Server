import React, { useEffect } from "react";
// @material-ui/core components
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import ButtonGroup from "@mui/material/ButtonGroup";

// const  useStyles = makeStyles((theme) => ({
//   cardCategoryWhite: {
//     color: "rgba(255,255,255,.62)",
//     margin: "0",
//     fontSize: "14px",
//     marginTop: "0",
//     marginBottom: "0"
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none"
//   }
// }));

const { REACT_APP_SERVER_URL } = process.env;

function UserProfile() {
  const [devices, setDevices] = React.useState("");
  const [deviceValue, setDeviceValue] = React.useState("");
  const [records, setRecords] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [devicesKey, setDeviceKey] = React.useState("");

  useEffect(() => {
    axios
      .get("/device/?page=1")
      .then((res) => {
        setDevices(res.data.data);
        RecordsData(res.data.data.devices_data[0].device_key);
        setDeviceKey(res.data.data.devices_data[0].device_key);
      })
      .catch((err) => {
        // alert(err)
      });
  }, []);
  const handleChange = (event) => {
    setDeviceValue(event);
  };

  function RecordsData(devicesKey) {
    setLoading(true);
    axios
      .get(`/recording/?page=${page}`, {
        headers: {
          "x-api-key": devicesKey,
        },
      })
      .then((res) => {
        setRecords(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        // alert(err)
      });
  }

  useEffect(() => {
    RecordsData(devicesKey);
  }, [page, devicesKey]);

  function handleNext() {
    setPage(page + 1);
  }
  function handlePre() {
    setPage(page - 1);
  }
  function DeviceKeyChange(val) {
    setDeviceKey(val);
    setPage(1);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <div className="flex flex-row">
                <div>
                  {" "}
                  <h4>
                    <b>Audios</b>
                  </h4>
                  <p>All audios recorded on the machines</p>
                </div>
                {devices.devices_data === null ||
                devices.devices_data === undefined ? null : (
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Devices
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                          deviceValue === ""
                            ? devices.devices_data[0].device_name
                            : deviceValue
                        }
                        label="Age"
                        onChange={(e) => {
                          handleChange(e.target.value);
                        }}
                      >
                        <option
                          selected
                          disabled
                          hidden
                          value={devices.devices_data[0].device_name}
                        >
                          {devices.devices_data[0].device_name}
                        </option>

                        {devices.devices_data.map((val, key) => (
                          <MenuItem
                            onClick={() => {
                              RecordsData(val.device_key);
                              DeviceKeyChange(val.device_key);
                            }}
                            value={val.device_key}
                            key={key}
                          >
                            {val.device_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardBody>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Sr.no</TableCell>
                      <TableCell align="center">Created Date</TableCell>
                      <TableCell align="center">Play</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records.recording_data === null ||
                    records.recording_data === undefined
                      ? null
                      : records.recording_data.map((val, key) => (
                          <TableRow key={key}>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {val.id}
                            </TableCell>
                            <TableCell align="center">
                              {val.created_datetime}
                            </TableCell>
                            <TableCell align="center">
                              <ReactAudioPlayer
                                src={val.recording_file}
                                controls
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <ButtonGroup variant="outlined" aria-label="text button group">
                <Button disabled={page <= 1 || loading} onClick={handlePre}>
                  Previous
                </Button>

                <Button
                  disabled={records.total_count / page <= 10 || loading}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>Alec Thompson</h4>
                <p className={classes.description}>
                  Don't be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>*/}
      </GridContainer>
    </div>
  );
}

export default UserProfile;
