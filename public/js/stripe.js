/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

const stripe = Stripe("pk_test_51OAWy6HV2HFjUpghvB9MsJPd80X06oy9Ew9Ww1eTq1rf9ylKFmzBvXiev6HR2JMCKN2mHysKxpxqc0bAP0ruc1Me00HU7xzIOC");

export const bookTour = async tourId => {

    try {

        //* 1-) Get checkout session from API
        const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
        console.log(session);

        //* 2-) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });

    } catch (err) {
        console.log(err);
        showAlert("error", err);
    }

} 