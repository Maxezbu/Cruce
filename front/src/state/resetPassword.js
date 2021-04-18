import axios from "axios";

export const forgotPassword = async (email) => {
  try {
    const res = await axios.put(
      "http://localhost:8000/api/user/forgot-password",
      email
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const resetPassword = async (pass, token) => {
  try {
    const res = await axios.put(
      "http://localhost:8000/api/user/reset-password",
      { newPass: pass, resetToken: token }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
///CADETRIAS

export const forgotPasswordCadeteria = async (email) => {
  try {
    const res = await axios.put(
      "http://localhost:8000/api/user/forgot-password-cadeteria",
      email
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const resetPasswordCadeteria = async (pass, token) => {
  try {
    const res = await axios.put(
      "http://localhost:8000/api/user/reset-password-cadeteria",
      { newPass: pass, resetToken: token }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
