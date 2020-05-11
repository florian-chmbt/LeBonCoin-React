import React from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const params = useParams();
  /*   console.log(params); */

  return (
    <div>
      <div>HELLO WOLRD</div>
      Products {params.id}
    </div>
  );
};

export default Products;
