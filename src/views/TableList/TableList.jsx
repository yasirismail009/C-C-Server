import React, { useEffect } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import "./tables.css";
import axios from "axios";
import Button from "../../components/CustomButtons/Button.jsx";
import ButtonGroup from "@mui/material/ButtonGroup";

// const styles = {
//   cardCategoryWhite: {
//     "&,& a,& a:hover,& a:focus": {
//       color: "rgba(255,255,255,.62)",
//       margin: "0",
//       fontSize: "14px",
//       marginTop: "0",
//       marginBottom: "0"
//     },
//     "& a,& a:hover,& a:focus": {
//       color: "#FFFFFF"
//     }
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none",
//     "& small": {
//       color: "#777",
//       fontSize: "65%",
//       fontWeight: "400",
//       lineHeight: "1"
//     }
//   }
// };

function TableList(props) {
    const [devices, setDevices] = React.useState("");
    const [deviceValue, setDeviceValue] = React.useState("");
    const [photos, setPhotos] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [devicesKey, setDeviceKey] = React.useState("");

    useEffect(() => {
        axios
            .get("/device/?page=1")
            .then(res => {
                setDevices(res.data.data);
                PhotosData(res.data.data.devices_data[0].device_key);
            })
            .catch(err => {
                // alert(err)
            });
    }, []);
    const handleChange = event => {
        setDeviceValue(event);
    };

    function PhotosData(value) {
        setLoading(true);
        axios
            .get(`/picture/?page=${page}`, {
                headers: {
                    "x-api-key": value,
                },
            })
            .then(res => {
                setPhotos(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                // alert(err)
            });
    }
    useEffect(() => {
        PhotosData(devicesKey);
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
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color='primary'>
                        <div>
                            <div>
                                <h4>
                                    <b>Photo Gallerey</b>
                                </h4>
                                <p>Photos Got through malware</p>
                            </div>
                            {devices.devices_data === null ||
                            devices.devices_data === undefined ? null : (
                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel id='demo-simple-select-label'>
                                            Devices
                                        </InputLabel>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            value={
                                                deviceValue === ""
                                                    ? devices.devices_data[0]
                                                          .device_name
                                                    : deviceValue
                                            }
                                            label='Age'
                                            onChange={e => {
                                                handleChange(e.target.value);
                                            }}>
                                            <option
                                                selected
                                                disabled
                                                hidden
                                                value={
                                                    devices.devices_data[0]
                                                        .device_name
                                                }>
                                                {
                                                    devices.devices_data[0]
                                                        .device_name
                                                }
                                            </option>

                                            {devices.devices_data.map(
                                                (val, key) => (
                                                    <MenuItem
                                                        onClick={() => {
                                                            PhotosData(
                                                                val.device_key
                                                            );
                                                            DeviceKeyChange(
                                                                val.device_key
                                                            );
                                                        }}
                                                        value={val.device_name}
                                                        key={key}>
                                                        {val.device_name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 3, sm: 4, md: 3, lg: 5 }}>
                            {photos.pictures_data === null ||
                            photos.pictures_data === undefined
                                ? null
                                : photos.pictures_data.map((val, key) => (
                                      <Grid
                                          item
                                          key={key}
                                          lg={2}
                                          md={3}
                                          xs={12}>
                                          <div className='img_wrap'>
                                              <img
                                                  src={val.image_path}
                                                  width='100%'
                                                  height='140'
                                              />
                                          </div>
                                      </Grid>
                                  ))}
                        </Grid>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                    }}>
                    <ButtonGroup
                        variant='outlined'
                        aria-label='text button group'>
                        <Button
                            disabled={page <= 1 || loading}
                            onClick={handlePre}>
                            Previous
                        </Button>

                        <Button
                            disabled={
                                photos.total_count / page <= 10 || loading
                            }
                            onClick={handleNext}>
                            Next
                        </Button>
                    </ButtonGroup>
                </div>
            </GridItem>
        </GridContainer>
    );
}

export default TableList;
