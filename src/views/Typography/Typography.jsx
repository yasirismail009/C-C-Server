import React, { useEffect } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "../../components/CustomButtons/Button.jsx";
import Typography from "@mui/material/Typography";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import { Icon, IconButton } from "@material-ui/core";
import ButtonGroup from "@mui/material/ButtonGroup";

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
function TypographyPage() {
  const [devices, setDevices] = React.useState("");
  const [deviceValue, setDeviceValue] = React.useState("");
  const [contacts, setContact] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [devicesKey, setDeviceKey] = React.useState("");

  useEffect(() => {
    axios
      .get("/device/?page=1")
      .then((res) => {
        setDevices(res.data.data);
        ContactsData(res.data.data.devices_data[0].device_key);
        setDeviceKey(res.data.data.devices_data[0].device_key);
      })
      .catch((err) => {
        // alert(err)
      });
  }, []);
  const handleChange = (event) => {
    setDeviceValue(event);
  };

  function ContactsData(value) {
    setLoading(true);
    axios
      .get(`/contact/?page=${page}`, {
        headers: {
          "x-api-key": value,
        },
      })
      .then((res) => {
        setContact(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        // alert(err)
      });
  }

  useEffect(() => {
    ContactsData(devicesKey);
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
    <Card>
      <CardHeader color="primary">
        <div className="flex flex-row">
          <div>
            {" "}
            <h4>
              <b>Contacts</b>
            </h4>
            <p>All Contacts found on the machines</p>
          </div>
          {devices.devices_data === null ||
          devices.devices_data === undefined ? null : (
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Devices</InputLabel>
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
                        ContactsData(val.device_key);
                        DeviceKeyChange(val.device_key);
                      }}
                      value={val.device_name}
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
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 3, sm: 4, md: 3, lg: 2 }}
        >
          {contacts.contacts_data === null ||
          contacts.contacts_data === undefined
            ? null
            : contacts.contacts_data.map((val, key) => (
                <Grid key={key} item lg={2} md={2} xs={12}>
                  <Card sx={{ minWidth: 275 }}>
                    <div>
                      <CopyToClipboard text={val.phone_number}>
                        <IconButton>
                          <Icon
                            color="action"
                            style={{ fontSize: 40 }}
                            className="text-20 text-gray-400"
                          >
                            content_copy
                          </Icon>
                        </IconButton>
                      </CopyToClipboard>
                    </div>
                    <CardContent
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                        alignContent: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <PersonPinIcon
                          color="primary"
                          style={{ fontSize: 40 }}
                        />
                      </Typography>
                      <Typography variant="h6" component="div">
                        {val.name}
                      </Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">
                        {val.phone_number}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>
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
              disabled={contacts.total_count / page <= 10 || loading}
              onClick={handleNext}
            >
              Next
            </Button>
          </ButtonGroup>
        </div>
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(TypographyPage);
