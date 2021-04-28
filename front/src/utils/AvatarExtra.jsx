import React from "react";
import { Avatar, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ExtraAvatar({ name, status }) {
  const classes = useStyles();
  const num = Math.floor(Math.random() * 10) + 1;
  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot"
        color={status === true ? "inherit" : "secondary"}
      >
        <Avatar
          alt="Cadete"
          src={process.env.PUBLIC_URL + `/avatars/person-${num}.svg`}
        />
      </Badge>
    </div>
  );
}
