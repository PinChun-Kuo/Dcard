import React from 'react';
import PropTypes from 'prop-types';

const SearchRepo = ({ repoName, repoUrl, ownerName, avatarUrl }) => (
  <div className='search-repo'>
    <a className='search-repo__detail' href={repoUrl} target='_blank'>
      <img className='repo-image' src={avatarUrl} />
      <div className='repo-info'>
        <p className='repo-name'>{repoName}</p>
        <p className='repo-owner-name'>{ownerName}</p>
      </div>
    </a>
  </div>
)

SearchRepo.propTypes = {
  repoName: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired
};

export default SearchRepo;
