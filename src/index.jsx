import React from 'react';
import PropTypes from 'prop-types';

const getClosestElement = (targetElement, selector) => {
  if (targetElement.closest) { return targetElement.closest(selector); }
  // otherwise polyfill
  let el = targetElement;
  do {
    if (el.matches(selector)) return el;
    el = el.parentElement;
  } while (el !== null);
  return null;
}

const FlyweightContainer = ({
  children,
  onClickDispatcher,
  onKeyDownDispatcher,
  className,
  bindSelector,
}) => {
  const onClick = ({ target }) => {
    onClickDispatcher(getClosestElement(target, bindSelector));
  }

  const onKeyDown = ({ target, which }) => {
    onKeyDownDispatcher(getClosestElement(target, bindSelector), which);
  }

  return (
    <div
      className={["react-flyweight-container", className].join(" ").trim()}
      {...{onClick: onClickDispatcher ? onClick : null}}
      {...{onKeyDown: onKeyDownDispatcher ? onKeyDown : null}}
    >
      {children}
    </div>
  );
}

FlyweightContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClickDispatcher: PropTypes.func,
  onKeyDownDispatcher: PropTypes.func,
  className: PropTypes.string,
  bindSelector: PropTypes.string.isRequired,
};

export default FlyweightContainer;
