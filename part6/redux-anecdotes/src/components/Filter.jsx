import React from 'react';
import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

function Filter() {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const content = e.target.value;
    dispatch(filterChange(content));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <label htmlFor="filter">
        {'filter: '}
        <input id="filter" onChange={handleChange} />
      </label>
    </div>
  );
}

export default Filter;
