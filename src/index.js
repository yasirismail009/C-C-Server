import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
// core components
import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import RTL from "layouts/RTL.jsx";
import { Provider } from 'react-redux'
import axios from "axios";
import store from "./store";
import "assets/css/material-dashboard-react.css?v=1.6.0";

axios.defaults.baseURL = "http://192.168.201.51:8000/";
// axios.defaults.headers.common.X-Api-Key = ``;

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Provider store={store}>
            <Switch>
                <Route path='/admin' component={Admin} />
                <Route path='/auth' component={Auth} />
                <Route path='/rtl' component={RTL} />
                <Redirect from='/' to='/admin/dashboard' />
            </Switch>
        </Provider>
    </Router>,
    document.getElementById("root")
);
