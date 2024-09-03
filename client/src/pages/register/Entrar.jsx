import React, { useState } from "react";

import Login from "./Login";
import PropTypes from "prop-types";
import Registrar from "./Registrar";

const Entrar = ({ onItemClick: onItemClickProp }) => {
  const [possuiConta, setPossuiConta] = useState(false);

  const onItemClick = (e) => {
    e.preventDefault();
    setPossuiConta(!possuiConta);
    if (onItemClickProp) {
      onItemClickProp(e);
    }
  };

  console.log(possuiConta);

  return (
    <div>
      {possuiConta ? (
        <Registrar onItemClick={onItemClick} />
      ) : (
        <Login onItemClick={onItemClick} />
      )}
    </div>
  );
};

Entrar.propTypes = {
  onItemClick: PropTypes.func,
};

export default Entrar;
