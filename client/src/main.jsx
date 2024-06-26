import React from "react";
import ReactDOM from "react-dom/client";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
