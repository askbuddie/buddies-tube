import React from 'react';

export default function Button({
  modifier = '',
  onClick: onClickCallback = () => {},
  children,
}) {
  return (
    <button className={`Button ${modifier}`.trim()} onClick={onClickCallback}>
      {children}
    </button>
  );
}
