import React, {useState} from 'react';
import SelectListComponent from './select-list.jsx';

const SELECT_ITEMS = [`Item 1`, `Item 2`, `Item 3`];

const SelectComponent = () => {
  const [isOpen, openToggler] = useState(false);
  const [activeItem, activeItemHandler] = useState(SELECT_ITEMS[0]);

  const itemHandler = (indexActiveItem) => {
    activeItemHandler(SELECT_ITEMS[indexActiveItem])
  }
  return <React.Fragment>
    <article
      className="select"
      onClick={() => openToggler(!isOpen)}
    >
      <p className="select__active">{activeItem}</p>
      {isOpen && <SelectListComponent items={SELECT_ITEMS} activeItemHandler={itemHandler}/>}
    </article>
  </React.Fragment>;
};

export default SelectComponent;
