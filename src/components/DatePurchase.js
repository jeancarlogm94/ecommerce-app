import React from "react";

const DatePurchase = ({ purchase }) => {
  const date = new Date(purchase.createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateString = date.toLocaleDateString(undefined, options);

  return (
    <div>
      {/* {purchase.createdAt} */}
      {dateString}
    </div>
  );
};

export default DatePurchase;
