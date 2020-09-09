import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import Loading from './loading';
import SearchBar from './searchBar';
import SearchRepo from './searchRepo';

const getRepos = async (query, page = 1) => {
  const res = await axios({
    method: 'get',
    url: 'https://api.github.com/search/repositories',
    params: {
      q: query,
      per_page: 20,
      page
    },
    responseType: 'json'
  })

  return res.data.items;
};

const App = () => {
  const inputRef = useRef();
  const observerRef = useRef();
  const prevY = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState({ keyword: '', page: 1 });
  const [resetPage, setResetPage] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const updateQuery = debounce(
    () => {
      prevY.current = 0;
      setResetPage(true);
      setIsLoading(true);
      setQuery({ keyword: inputRef.current.value, page: 1 });
    },
    800
  );

  const handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;

    if (prevY.current > y) {
      setQuery(({ page, ...rest }) => ({ page: page + 1, ...rest }))
    }

    prevY.current = y;
  }

  const observer = new IntersectionObserver(
    handleObserver,
    { root: null, rootMargin: "0px", threshold: 0 }
  );

  useEffect(() => {
    observer.observe(observerRef.current);
  }, [])

  useEffect(() => {
    const { keyword, page } = query

    if (keyword.trim()) {
      getRepos(keyword, page).then(repos => {
        if (resetPage) {
          setRepositories(repos);
          setResetPage(false);
        } else {
          setRepositories(repositories.concat(repos));
        }

        setIsLoading(false);
      }).catch(res => {
        setIsLoading(false);
        console.log('API Error : ', res.message);
      });
    } else {
      setIsLoading(false);
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
      <div class="observer" ref={observerRef}></div>
    </div>
  )
};

export default App;
