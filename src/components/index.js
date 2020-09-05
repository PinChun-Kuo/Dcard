import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import Loading from './loading';
import SearchBar from './searchBar';
import SearchRepo from './searchRepo';

const getRepos = async query => {
  const res = await axios({
    method: 'get',
    url: `https://api.github.com/search/repositories`,
    params: {
      q: query,
      per_page: 5
    },
    responseType: 'json'
  })

  return res.data.items;
};

const App = () => {
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const updateQuery = debounce(
    () => setQuery(inputRef.current.value),
    800
  );

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      getRepos(query).then(repos => {
        setRepositories(repos);
        setIsLoading(false);
      }).catch(res => {
        setIsLoading(false);
        console.log('API Error : ', res.message);
      });
    } else {
      setRepositories([]);
    }
  }, [query]);

  return (
    <div className='search-wrapper'>
      <SearchBar inputRef={inputRef} updateQuery={updateQuery} />
      {
        isLoading ? (
          <Loading />
        ) : (
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
        )
      }
    </div>
  )
};

export default App;
