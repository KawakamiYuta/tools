import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';

function forwardConsole(fnName, logger) {
  const original = console[fnName];
  console[fnName] = (...args) => {
    original(...args);
    logger(args.map(String).join(" "));
  };
}

forwardConsole('log', trace);
forwardConsole('debug', debug);
forwardConsole('info', info);
forwardConsole('warn', warn);
forwardConsole('error', error);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <App />
  ///* </React.StrictMode>, */}
);
