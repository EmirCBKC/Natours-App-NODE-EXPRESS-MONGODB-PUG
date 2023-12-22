/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

//* type is either "password" or "data"
export const resetPassword = async (token, password, passwordConfirm) => {

    try {
        const res = await axios({
            method: "PATCH",
            url: `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,
            data: {
                password,
                passwordConfirm
            }
        });

        if (res.data.status === "success") {
            showAlert("success", "Password updated successfully!");
            window.setTimeout(() => {
                location.assign("/login");
            }, 1500);
        }

        console.log(res);

    } catch (err) {
        showAlert("error", err.response.data.message);
    }

};