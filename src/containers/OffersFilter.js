import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const OffersFilter = () => {
  const params = useParams();
  const [offers, setOffers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //STATE // Paramètres Query :
  const [search, setSearch] = useState(false);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();

  /* https://leboncoin-api.herokuapp.com/offer/with-count?title=Peugeot */
  /*   {item.title === query.title && ( */

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/offer/with-count/?title=" + title
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
        <nav className="navi">
          {/*  <div>SALUT MONDE</div>
          <div>OffersFilter {params.id} </div>
          <div>count {offers.count} </div> */}
          <article className="searchBar">
            <input
              placeholder="tapez votre recherche"
              type="text"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </article>

          {search ? (
            <p>loading... Please Wait !</p>
          ) : (
            <nav>
              {offers.offers.map((item) => {
                return (
                  <div>
                    <article
                      /* CREATION DUN LIEN DE NAVIGATION VERS LA ROUTE "OFFER  */

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
                      </section>
                      CREATION DUN LIEN DE NAVIGATION VERS LA ROUTE "OFFER
                      --------------------------------------"
                      <Link to={`/offer/${item._id}`}>
                        <div>Mon offre</div>
                      </Link>
                    </article>
                  </div>
                );
              })}
            </nav>
          )}
        </nav>
      )}
    </>
  );
};

export default OffersFilter;
