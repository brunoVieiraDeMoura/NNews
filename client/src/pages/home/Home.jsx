import React from "react";
import PropTypes from "prop-types";

const Home = ({ onTheme }) => {
  return (
    <div>
      <h1>home</h1>
      <button onClick={onTheme}>clica</button>
    </div>
  );
};

Home.propTypes = {
  onTheme: PropTypes.func.isRequired,
};

export default Home;
