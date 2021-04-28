import { CssBaseline } from "@material-ui/core";
import React from "react";
import useStyles from "../styles/stylesFooter";

export default function Error() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <img
        style={{ maxWidth: "100%" }}
        src="https://images.assetsdelivery.com/compings_v2/lkeskinen/lkeskinen1610/lkeskinen161000200.jpg"
        alt="403"
      />
    </div>
  );
}
