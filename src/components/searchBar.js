import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SearchBar = ({ classes, keyword, inputClasses, handleChange }) => (
  <div className={classNames('search-bar', classes)}>
    <input
      value={keyword}
      className={classNames('search-input', inputClasses)}
      type='text'
      placeholder='Please enter search keyword'
      onChange={handleChange}
    />
  </div>
)

SearchBar.propTypes = {
  classes: PropTypes.string,
  keyword: PropTypes.string.isRequired,
  inputClasses: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default SearchBar;
