import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

/* cardElement = formaulaire de donnéee de CB directement importé du package Stripe */

const CheckoutForm = () => {
  // Déclaration varibale Stipe
  const elements = useElements();
  const stripe = useStripe();

  // déclaration state
  const [completed, setCompleted] = useState(false); // verifier si paiement réussi

  // Function pour activer le bouton du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // récupérer les données bancaires de l'utilisateur
    const cardElement = elements.getElement(CardElement);

    // Demander un token à l'API Stripe
    // Envoyer les données bancaires à Stripe pour récupéré un Token de Stripe => requete vers l'API STRIPE
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "l'id de l'utilisateur",
    });
    console.log(stripeResponse);
    console.log(stripeResponse.token.id); // => tok_1Gi0QPKugZQgSY77TewN9FJ5

    // requête vers le serveur
    const response = await axios.post("http://localhost:3100/pay", {
      // "https://leboncoin-api.herokuapp.com/payment"
      stripeToken: stripeResponse.token.id, // Striptoken doit avoir le meme nom coté Back
      // on envoie aussi toutes les données nécessaires au paiement (titre, description, prix, userID, producID...)
    });
    console.log(response.data);
    console.log(response.data.status); // => "succeded" = payement réussi

    // verifier si paiement réussi
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div>
      {completed ? (
        //   alert("Paiement effectué !")
        <span>Paiement effectué ! </span>
      ) : (
        /* FORMULAIRE DE DONNEE BANCAIRE */
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
