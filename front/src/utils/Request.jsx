import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import AvatarEXtra from "./AvatarExtra";
import { Chip, Typography } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import BlockIcon from "@material-ui/icons/Block";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    marginBottom: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
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

export default function Requests({
  cadete = [],
  cadeteria = [],
  handleActive,
}) {
  const classes = useStyles();
  const { firstName, lastName } = cadete;
  const { nameCompany, CUIT } = cadeteria;

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <Paper
        component="form"
        key={cadete.id || cadeteria.id}
        className={classes.root}
      >
        <AvatarEXtra status={cadeteria.active || cadete.active} />
        <Typography className={classes.info} variant="body1">{`${
          firstName || nameCompany
        } ${lastName || CUIT}`}</Typography>
        {cadeteria.active || cadete.active ? (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              handleActive(cadeteria.id || cadete.id);
            }}
          >
            <Chip
              icon={<DoneIcon />}
              label="Activo"
              style={{ color: "green" }}
              variant="outlined"
            />
          </IconButton>
        ) : (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              handleActive(cadeteria.id || cadete.id);
            }}
          >
            <Chip
              icon={<BlockIcon />}
              label="Inactivo"
              color="secondary"
              variant="outlined"
            />
          </IconButton>
        )}
      </Paper>
    </div>
  );
}
