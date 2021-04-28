import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
import AvatarEXtra from "./AvatarExtra";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "99%",
    position: "relative",
  },
  info: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    position: "relative",
    width: "13%",
  },
  divider: {
    height: 28,
    margin: 2,
  },
}));

export default function Requests({ cadete = [], cadeteria = [] }) {
  const classes = useStyles();

  const { firstName, lastName } = cadete;

  const { nameCompany, CUIT } = cadeteria;

  return (
    <Paper component="form" key={cadete.id || cadeteria.id} className={classes.root}>
      <AvatarEXtra  />
      <Typography className={classes.info} variant="body1">{`${
        firstName || nameCompany
      } ${lastName || CUIT}`}</Typography>
      <IconButton
        className={classes.iconButton}
        aria-label="accept"
        onClick={() => alert("Cadete aceptado")}
      >
        <CheckCircleOutlinedIcon style={{ color: "lime" }} />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        className={classes.iconButton}
        aria-label="decline"
        onClick={() => alert("Cadete rechazado")}
      >
        <BlockOutlinedIcon style={{ color: "red" }} />
      </IconButton>
    </Paper>
  );
}
