import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './searchBar';
import SearchRepo from './searchRepo';

const getRepos = async keyword => {
  const res = await axios({
    method: 'get',
    url: `https://api.github.com/search/repositories`,
    params: {
      q: keyword,
      per_page: 5
    },
    responseType: 'json'
  })

  return res.data.items;
};

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  const updateKeyword = e => { setKeyword(e.target.value) }

  useEffect(() => {
    keyword.trim() ? (
      getRepos(keyword).then(repos => {
        setRepositories(repos);
      }).catch(res => {
        console.log('API Error : ', res.message);
      })
    ) : setRepositories([]);
  }, [keyword]);

  return (
    <div className='search-wrapper'>
      <SearchBar keyword={keyword} handleChange={updateKeyword} />
      {
        (repositories.length > 0) && (
          <div className='search-repos'>
            {
              repositories.map(repository => (
                <SearchRepo
                  repoName={repository.full_name}
                  repoUrl={repository.html_url}
                  ownerName={repository.owner.login}
                  avatarUrl={repository.owner.avatar_url}
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
};

export default App;
