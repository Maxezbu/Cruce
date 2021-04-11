import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useStyles from "../utils/stylesFooter";
import Copyright from "../utils/Copyright";

export default function Error() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img style={{maxWidth:'100%'}}
        src="https://images.assetsdelivery.com/compings_v2/lkeskinen/lkeskinen1610/lkeskinen161000200.jpg"
        alt="403"
      />
    </div>
  );
}
