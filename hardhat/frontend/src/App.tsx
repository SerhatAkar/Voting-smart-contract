import React from 'react';
import {useState} from "react";
import {ethers} from 'ethers';
import './App.css';
import VotingContract from 'VotingContract/VotingContract.json';
import Welcome from './VIews/Welcome';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Container, CssBaseline} from "@material-ui/core";
import Header from "./Components/Header/Header";
import VotingArea from "./Components/Container/VotingArea";
import Footer from "./Components/Footer/Footer";
import {positions} from '@material-ui/system';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import WelcomeView from "./VIews/WelcomeView";
import {Alert} from "antd";
import {GetContractAddress} from "./hooks/contracts";

const votingContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

declare const window: any;

function App() {
    const  address = GetContractAddress();
    return (
        <React.Fragment>
            <Router>
                <Welcome loopDuration={3000}/>
                <Grid container className={"app1"} alignItems={"stretch"}>
                    <Grid item xs={12}>
                        <Header/>
                        {
                           address && <Alert message={`Contract is deployed on the Ropsten testnet at => ${address} ` }type="success" showIcon/>
                        }
                    </Grid>
                    <Grid item xs={12} style={{minHeight: "90%"}}>
                        <Grid container>
                            <main>
                                <Switch>
                                    <Route exact path="/" component={WelcomeView}/>
                                </Switch>
                            </main>
                        </Grid>
                    </Grid>

                </Grid>
                <Footer/>
            </Router>
        </React.Fragment>
    );
}

export default App;