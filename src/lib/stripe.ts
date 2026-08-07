import Stripe from "stripe";
import envVars from "../config/envVars";

const stripe = new Stripe(envVars.stripe_secret_key);

export default stripe;