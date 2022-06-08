import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchases } from "../store/slices/purchases.slices";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  return (
    <div>
      <h1>Purchases</h1>
      <ul>
        {purchases.map((purchase) => (
          <li>
            {purchase.cart.products.map((product) => (
              <div onClick={() => navigate(`/products/${product.id}`)}>
                {product.title}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
