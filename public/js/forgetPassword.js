/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const forgetPassword = async (email) => {

    try {
        const res = await axios({
            method: "POST",
            url: "http://127.0.0.1:3000/api/v1/users/forgotPassword",
            data: {
                email
            }
        });
        if (res.data.status === "success") {
            showAlert("success", "Email sent successfully!");
            window.setTimeout(() => {
                location.assign("/reset");
            }, 1500);
        }
        console.log(res);
    } catch (err) {
        showAlert("error", err.response.data.message);
    }

};