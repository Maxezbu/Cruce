import axios from "axios";

export const sendmail = (r, name, t) => {
  return axios
    .post("http://localhost:8000/api/sendmail/user", {
      receiver: r,
      name: name,
      transmitter: t,
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const sendmailToAdmin = (cadeteria) => {
  return axios
    .post("http://localhost:8000/api/sendmail/admin", cadeteria)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};
