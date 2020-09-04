import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const repoNameRule = /^[A-Za-z0-9\-_]+$/;

const SearchBar = ({ classes, inputRef, inputClasses, updateQuery }) => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const updateKeyword = () => { setKeyword(inputRef.current.value) }
  const handleChange = () => {
    updateKeyword();
    updateQuery();

    const isValid = inputRef.current.value.match(repoNameRule);

    if (isValid) {
      setError('');
    } else {
      setError('Please enter a valid repository name.')
    }
  }

  return (
    <div className={classNames('search-bar', classes)}>
      <input
        ref={inputRef}
        value={keyword}
        className={classNames('search-input', inputClasses, { 'has-error': !!error })}
        type='text'
        placeholder='Please enter search keyword'
        onChange={handleChange}
      />
      { error && ( <span className='error-msg'>{error}</span> ) }
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
