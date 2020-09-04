import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SearchBar = ({ classes, inputRef, inputClasses, updateQuery }) => {
  const [keyword, setKeyword] = useState('');
  const updateKeyword = () => { setKeyword(inputRef.current.value) }
  const handleChange = () => {
    updateKeyword();
    updateQuery();
  }

  return (
    <div className={classNames('search-bar', classes)}>
      <input
        ref={inputRef}
        value={keyword}
        className={classNames('search-input', inputClasses)}
        type='text'
        placeholder='Please enter search keyword'
        onChange={handleChange}
      />
    </div>
  )
}

SearchBar.propTypes = {
  classes: PropTypes.string,
  inputRef: PropTypes.object.isRequired,
  inputClasses: PropTypes.string,
  updateQuery: PropTypes.func.isRequired
};

export default SearchBar;
