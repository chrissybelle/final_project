import React from "react";
import PropTypes from 'prop-types';
import "./Wrapper.css";

// const { showCard } = this.props
const Wrapper = props => 
    <div className="wrapper">
    {/* <i className="fa fa-spinner fa-spin" aria-hidden="true" /> */}
        {props.children}
    </div>;


Wrapper.propTypes = {
    showCard: PropTypes.bool
    // handleBtnClick: PropTypes.func
  }

export default Wrapper;
