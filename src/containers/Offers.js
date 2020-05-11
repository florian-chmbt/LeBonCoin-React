/* import React from "react"; */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Offers = () => {
  const params = useParams();
  /*  console.log(params); */
  const [offers, setOffers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/offer/with-count/"
      );
      console.log(response.data);
      setOffers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("Fetching Data");
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>loading... Please Wait !</p>
      ) : (
        <div>
          <div>SALUT MONDE</div>
          <div>Offers {params.id} </div>
          <div>count {offers.count} </div>
          {/* on récupère l'obj JSON grace au state dans laquel il a été stocké */}
          {offers.offers.map((item) => {
            return (
              /*    <Link to={`/offer/${item._id}`}> */
              <nav>
                <article
                  key={item._id}
                  style={{
                    display: "flex",
                    backgroundColor: "beige",
                    marginBottom: "5px",
                  }}
                >
                  {item.picture && (
                    <img
                      style={{
                        height: "135px",
                        width: "135px",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                      alt={item.title}
                      src={item.picture.url}
                    />
                  )}
                  <section>
                    <h2
                      style={{
                        backgroundColor: "blue",
                      }}
                    >
                      {item.title}
                    </h2>
                    <div>{item.price} € </div>
                    <br />
                    <div>{item.created}</div>
                    <div>{item._id}</div>
                    {/*       <p>{item.description.slice(0, 60)}...</p> */}
                  </section>
                  CREATION DUN LIEN DE NAVIGATION VERS LA ROUTE "OFFER
                  --------------------------------------"
                  <Link to={`/offer/${item._id}`}>
                    {/*   <Link to="/offer/5eb19adf63295b0017512529"> */}
                    <div>Mon offre</div>
                  </Link>
                </article>
              </nav>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Offers;
