/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const likeDelete = async (likeID) => {

    try {
        const res = await axios({
            method: "DELETE",
            url: `http://127.0.0.1:3000/api/v1/likes/${likeID}`,
        });
        if (res.data.status === "success") {
            showAlert("success", "You Unliked this tour! 🔴");
            window.setTimeout(() => {
                location.reload(true);
            }, 1500);
        }
        console.log(res);
    } catch (err) {
        showAlert("error", err.response.data.message);
    }

};
