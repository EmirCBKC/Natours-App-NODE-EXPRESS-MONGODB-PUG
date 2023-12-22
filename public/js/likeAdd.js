/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const likeAdd = async (like, tour, user) => {

    try {
        const res = await axios({
            method: "POST",
            url: "http://127.0.0.1:3000/api/v1/likes",
            data: {
                like,
                tour,
                user
            }
        });
        if (res.data.status === "success") {
            showAlert("success", "You liked this tour! 👍");
            window.setTimeout(() => {
                location.reload(true);
            }, 1500);
        }
        console.log(res);
    } catch (err) {
        showAlert("error", err.response.data.message);
    }

};
