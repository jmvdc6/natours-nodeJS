import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51ILVL0C9MSU5fHPvv8BXVrwMizzJqsGfLmh1lVWL7ymSTa2r3oxhpkvKldzWOrNFU6lcG1nb8gcGRyVD8BwrzuyM005gTHUPRU'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('err', err);
  }
};
