import { Alert, Box } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

interface IAlert {
  severity: "error" | "warning" | "info" | "success";
  message: string;
  visible: boolean;
}

interface AlertContext {
  alert: IAlert;
  setError: (msg: string) => void;
  setWarning: (msg: string) => void;
  setInfo: (msg: string) => void;
  setSuccess: (msg: string) => void;
  resetAlert: () => void;
}

const initialState = {
  severity: "info",
  message: "",
  visible: false,
} as IAlert;

const AlertCtx = createContext({} as AlertContext);

// TODO: convert message from markdown to jsx
export const AlertProvider = ({ children }: React.PropsWithChildren) => {
  const [alert, alertSet] = useState(initialState);

  const setError = (message: string) =>
    alertSet({ severity: "error", visible: true, message });

  const setWarning = (message: string) =>
    alertSet({ severity: "warning", visible: true, message });

  const setInfo = (message: string) =>
    alertSet({ severity: "info", visible: true, message });

  const setSuccess = (message: string) =>
    alertSet({ severity: "success", visible: true, message });

  const resetAlert = () => alertSet(initialState);

  return (
    <AlertCtx.Provider
      value={
        {
          alert,
          setError,
          setWarning,
          setInfo,
          setSuccess,
          resetAlert,
        } as AlertContext
      }
    >
      {alert.visible ? (
        <Box
          sx={(theme) => ({
            position: "fixed",
            top: 10,
            left: 10,
            right: 10,
            zIndex: theme.zIndex.modal,
          })}
        >
          <Alert severity={alert.severity} onClose={resetAlert}>
            {alert.message}
          </Alert>
        </Box>
      ) : null}
      {children}
    </AlertCtx.Provider>
  );
};

export const useAlert = () => useContext(AlertCtx);
