import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import useStyles from "../styles/stylesFooter";
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
