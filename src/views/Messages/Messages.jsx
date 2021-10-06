import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import MessagesApp from "../../message/App";
import axios from "axios";
import { Card } from "@material-ui/core";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { changeDeviceKey } from "../../store";

const style = {
    typo: {
        paddingLeft: "25%",
        marginBottom: "40px",
        position: "relative",
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
        width: "260px",
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
};

function MessagesPage(props) {
    const dispatch = useDispatch();
    const [allDevices, setAllDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currDevice, setCurrDevice] = useState({});

    useEffect(() => {
        async function getAllDevices() {
            setLoading(true);
            const res = await axios.get("/device/?page=1");
            const data = res.data.data.devices_data;
            setAllDevices(data);
            setCurrDevice(data[0]); // Select first device as default
            dispatch(changeDeviceKey({ deviceKey: data[0].device_key }));
            setLoading(false);
        }
        getAllDevices();
    }, []);

    const handleDeviceChange = ev => {
        const _device = _.find(allDevices, function(o) {
            return o.device_key === ev.target.value;
        });
        setCurrDevice(_device);
        dispatch(changeDeviceKey({ deviceKey: _device.device_key }));
    };
    return (
        <Card>
            <CardHeader color='primary'>
                <div className='flex flex-row'>
                    <div>
                        <h4>
                            <b>Messages</b>
                        </h4>
                        <p>All Messages found on the machines</p>
                    </div>
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            Devices
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={currDevice.device_name}
                            label='Age'
                            onChange={handleDeviceChange}>
                            {allDevices.map((device, key) => (
                                <MenuItem
                                    value={device.device_key}
                                    key={device.device_key}>
                                    {device.device_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </CardHeader>
            <CardBody>
                {!loading && <MessagesApp deviceKey={currDevice.device_key} />}
            </CardBody>
        </Card>
    );
}

export default withStyles(style)(MessagesPage);
