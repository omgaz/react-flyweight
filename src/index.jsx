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

const FlyweightProps = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClickDispatcher: PropTypes.func,
  onKeyDownDispatcher: PropTypes.func,
  className: PropTypes.string,
  bindSelector: PropTypes.string.isRequired,
  rootElementTagName: PropTypes.string,
};

const FlyweightContainer = (props) => {
  const {
    children,
    onClickDispatcher,
    onKeyDownDispatcher,
    className,
    bindSelector,
    rootElementTagName,
    ...passThroughProps, // anything else defined we just pass through e.g. style, data-*, id etc...
  } = props;

  const onClick = (event) => {
    const { target } = event;
    onClickDispatcher(getClosestElement(target, bindSelector), event);
  }

  const onKeyDown = (event) => {
    const { target, which } = event;
    onKeyDownDispatcher(getClosestElement(target, bindSelector), which, event);
  }

  const Component = rootElementTagName;

  return (
    <Component
      className={["react-flyweight-container", className].join(" ").trim()}
      {...{onClick: onClickDispatcher ? onClick : null}}
      {...{onKeyDown: onKeyDownDispatcher ? onKeyDown : null}}
      {...passThroughProps}
    >
      {children}
    </Component>
  );
}

FlyweightContainer.defaultProps = {
  rootElementTagName: 'div',
}

FlyweightContainer.propTypes = FlyweightProps;

export default FlyweightContainer;
