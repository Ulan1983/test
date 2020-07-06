import React from 'react';
import Routes from "./Routes";
import {ToastContainer} from "react-toastify";

const App = () => {
  return (
      <>
        <ToastContainer autoClose={2000} />
        <Routes/>
      </>
  );
};

export default App;