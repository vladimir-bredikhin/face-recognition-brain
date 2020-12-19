import React from "react";

const Rank = ({ user: { name, entries } }) => {
  return (
    <>
      <div className="white db f3">{`${name}, your current rank is...`}</div>
      <div className="white db f1">{`#${entries}`}</div>
    </>
  );
};

export default Rank;
