import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import useStyles from "../utils/stylesFooter";
import Copyright from "../utils/Copyright";

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
        <Copyright />
        </Container>
      </footer>
    </div>
  );
}
