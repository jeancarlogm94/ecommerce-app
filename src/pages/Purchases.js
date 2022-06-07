import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPurchases } from "../store/slices/purchases.slices";

const Purchases = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  return (
    <div>
      <h1>Purchases</h1>
    </div>
  );
};

export default Purchases;
