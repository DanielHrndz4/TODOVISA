import React from "react";
import MuiAlert from "@mui/lab/Alert";

export default function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

