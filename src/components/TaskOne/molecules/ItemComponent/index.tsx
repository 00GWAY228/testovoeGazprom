import React from 'react';
import { TItem } from '../../types';

const ItemComponent: React.FC<TItem> = ({ header, options, text }) => {
  return (
    <div className="item-component">
      <h2>{header}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <p>{text}</p>
    </div>
  );
};

export default ItemComponent;
