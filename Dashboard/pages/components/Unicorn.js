import React from "react";

const Unicorn = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.color}</td>
      <td>{props.location}</td>
    </tr>
  );
};

export default Unicorn;
