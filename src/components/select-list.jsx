import React from 'react';

const SelectListComponent = (props) => {
  const {items, activeItemHandler} = props;
  return <React.Fragment>
    <ul className="list-style select__list">
      {items.map((it, index) => {
        return <li
                className="select__item"
                key={index}
                onClick={() => activeItemHandler(index)}
              >
                {it}
              </li>
      })}
    </ul>
  </React.Fragment>;
};

export default SelectListComponent;
