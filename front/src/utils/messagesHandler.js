const messagesHandler = ({ enqueueSnackbar }) => {

  const messages = {

    error: (msg = "Datos incorrectos") =>
      enqueueSnackbar(`${msg}`, {
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      }),

    success: (msg = "Datos correctos") =>
      enqueueSnackbar(`${msg}`, {
        variant: "success",
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      }),

    admin: () =>
      enqueueSnackbar("Ingresando como usuario administrador", {
        variant: "warning",
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      }),

    info: (msg = "Usuario deslogueado") =>
      enqueueSnackbar(`${msg}`, {
        variant: 'info',
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      }),
      
  };

  return messages;
};

export default messagesHandler;
