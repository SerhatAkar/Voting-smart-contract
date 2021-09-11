import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./State/index";
import {ChainId, Config, DAppProvider} from '@usedapp/core';


const config: Config = {
    readOnlyChainId: ChainId.Ropsten,
    readOnlyUrls: {
        [ChainId.Ropsten]: 'https://ropsten.infura.io/v3/597374acbde446ce905533e2a0789aea',
    },
    supportedChains: [ChainId.Ropsten],
}

ReactDOM.render(
    <React.StrictMode>
        <DAppProvider config={config}>
            <Provider store={store}>
                <App/>
            </Provider>
        </DAppProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
