import React from 'react';
import PropTypes from 'prop-types';

const FlyweightContainer = ({ onClickDispatcher, children }) => {
  const onClick = ({ target }) => {
    if (!Object.keys(target.dataset).length) return;
    onClickDispatcher(target.dataset);
  };

  return <div className="flyweight" onClick={onClick}>{children}</div>;
}

FlyweightContainer.props = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClickDispatcher: PropTypes.func.isRequired,
};

export default FlyweightContainer;
