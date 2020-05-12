/* IMPORT PACKAGE */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Offer = () => {
  const params = useParams();
  /*  console.log(params); */
  const [offers, setOffers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/offer/with-count/"
      );
      /*     
REQUETE BACKEND  : "https://leboncoin-api.herokuapp.com/offer/:id"
REQUETE FRONTEND : `https://leboncoin-api.herokuapp.com/offer/${params.idToto}`
EXEMLE:
    Id = 5eb19adf63295b0017512529
    https://leboncoin-api.herokuapp.com/offer/5eb19adf63295b0017512529
  */
      /*     console.log(response.data); */
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
          <div>Offer detail {params.id} </div>
          <nav
            style={{
              display: "flex",
              backgroundColor: "white",
              marginBottom: "5px",
            }}
          >
            {offers.offers.map((item, index) => {
              return (
                <article>
                  {item._id === params.idToto && (
                    <>
                      <section
                        style={{
                          backgroundColor: "beige",
                          width: "705px",
                          height: "610px",
                        }}
                      >
                        {item.picture && (
                          <img
                            style={{
                              height: "395px",
                              width: "700px",
                              borderRadius: "5px",
                              objectFit: "cover",
                            }}
                            alt={item.title}
                            src={item.picture.url}
                          />
                        )}
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

                      <section
                        style={{
                          backgroundColor: "beige",
                          marginTop: "30px",
                          width: "705px",
                          height: "155px",
                        }}
                      >
                        Description
                        <p>{item.description.slice(0, 60)}...</p>
                      </section>
                    </>
                  )}
                </article>
              );
            })}
            <aside>
              <div>USERNAME</div>

              <div className="Linkdiv">
                <Link
                  className="Link"
                  style={{ textDecoration: "none" }}
                  to="/payment/"
                >
                  Acheter
                </Link>
              </div>
            </aside>
          </nav>
        </div>
      )}
    </>
  );
};

export default Offer;
