import React from 'react';
import PropTypes from 'prop-types';

const getClosestElement = (targetElement, selector) => {
  if (targetElement.closest) { return targetElement.closest(selector); }
  // otherwise polyfill
  let el = targetElement;
  // Internet Explorer implements element.matches, prefixed, under the non-standard name msMatchesSelector
  const matches = el.matches ? 'matches' : 'msMatchesSelector';
  do {
    if (el[matches](selector)) return el;
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
  const onClick = (event) => {
    const { target } = event;
    onClickDispatcher(getClosestElement(target, bindSelector), event);
  }

  const onKeyDown = (event) => {
    const { target, which } = event;
    onKeyDownDispatcher(getClosestElement(target, bindSelector), which, event);
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
