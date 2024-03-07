import React from 'react';
import ReactDOM from 'react-dom/client';
//import { createRoot} from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./store";
import './index.css';
import App from './App';
import * as serviceWorker from "./serviceWorker";
//import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

/*ReactDOM.render(
  <Provider store={ store }> 
    <App />
  </Provider>,
  document.getElementById("root")
);*/

serviceWorker.unregister();
