import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react'


// Ensure the root container exists
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found! Make sure you have <div id='root'></div> in your HTML.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
   <ChakraProvider>
    <App />
   </ChakraProvider>
  </React.StrictMode>
);