import React, {useEffect, useRef, useState, useContext} from 'react';
import {getTrending, getSearchResults} from './api'
import {Search} from './Search'
import logo from './logo.svg';
import './App.css';

function App() {
  const [trendingGifs, setTrendingGifs] = useState(null)
  const inputRef = useRef(null)
  const [searchInput, updateSearchInput] = useState(null)
  const [searchResults, setSearchResults] = useState(null)

  const fetchTrendingGifs = async() => {
    let trendingGifs = await getTrending()

    return {trendingGifs}
  }

  const fetchSearchResults = async() => {
    let searchResults = await getSearchResults()

    return {searchResults}
  }

  const changeResults = (item) => {
    // TODO add debounce
    fetchSearchResults(item).then(response => {
      updateSearchInput(response.data)
    })
    
  }

  useEffect(() => {
    fetchTrendingGifs().then(response => {
      setTrendingGifs(response.trendingGifs)
    })

    return () => {
      setTrendingGifs(null)
    }
  }, [])

  trendingGifs && console.log(`data is ${trendingGifs.data}`)
  searchInput && console.log(`searchInput is ${searchInput}`)
  return (
    <div className="App">
      <div className="searchBox">
        <input className="searchInput"
          ref={inputRef}
          value={searchInput}
          onChange={(e) => changeResults(e.currentTarget.value)}
          type="text" placeholder="Search for GIFs by name"
        />
      </div>
      {searchInput && searchInput.trim() ? 
        searchResults && searchResults.data && searchResults.data.map(item => {
          return <img src={item.images.fixed_height.url} />
        })
      : 
      trendingGifs && trendingGifs.data && 
        trendingGifs.data.map(gif => { 
          return <img src={gif.images.fixed_height.url} />
        }) 
      }
      
    </div>
  );
}

export default App;
