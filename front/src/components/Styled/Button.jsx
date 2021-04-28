import React from "react";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const CustomButton = styled(({ color, ...other }) => (
  <Button {...other} />
))({
  background: (props) =>
    props.color === "red"
      ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
      : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  boxShadow: (props) =>
    props.color === "red"
      ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
      : "0 3px 5px 2px rgba(33, 203, 243, .3)",

  color: "white",
  height: 48,
  padding: "0 30px",
  margin: 8,
  border: 0,
  borderRadius: 5,
});

export const CustomButtonB = styled(({ color, ...other }) => (
  <Button {...other} />
))({
  background: (props) =>
    props.color === "admin"
      ? "linear-gradient(45deg, #fdd04c 30%, #FF8E53 90%)"
      : "linear-gradient(45deg, #eeeeee, 30%, #9e9e9e 90%)",
  boxShadow: (props) =>
    props.color === "admin"
      ? "0 3px 5px 2px rgba(205, 105, 135, .3)"
      : "0 3px 5px 2px rgba(68, 103, 103, .3)",

  color: "white",
  height: 48,
  padding: "0 30px",
  margin: 8,
  border: 0,
  borderRadius: 5,
});

export const StatusButton = styled(({ color, ...other }) => (
  <Button {...other} />
))({
  background: (props) =>
    props.color === "pending"
      ? "linear-gradient(45deg, #b2dfdb 30%, #80cbc4 90%)"
      : "linear-gradient(45deg, #fff9c4, 30%, #ffca28 90%)",
  boxShadow: (props) =>
    props.color === "pending"
      ? "0 3px 5px 2px rgba(105, 105, 135, .3)"
      : "0 3px 5px 2px rgba(203, 153, 53, .3)",

  color: "white",
  height: 48,
  padding: "0 30px",
  margin: 8,
  border: 0,
  borderRadius: 5,
});

export const StatusButtonB = styled(({ color, ...other }) => (
  <Button {...other} />
))({
  background: (props) =>
    props.color === "fulfilled"
      ? "linear-gradient(45deg, #76ff03 30%, #689f38 90%)"
      : "linear-gradient(45deg, #e53935, 30%, #c62828 90%)",
  boxShadow: (props) =>
    props.color === "fulfilled"
      ? "0 3px 5px 2px rgba(105, 205, 135, .3)"
      : "0 3px 5px 2px rgba(255, 103, 243, .3)",

  color: "white",
  height: 48,
  padding: "0 30px",
  margin: 8,
  border: 0,
  borderRadius: 5,
});
