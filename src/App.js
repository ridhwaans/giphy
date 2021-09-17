import React, {useEffect, useRef, useState, useContext} from 'react';
import {getTrending, getSearchResults} from './api'
import Modal from './Modal.js';
import logo from './logo.svg';
import './App.css';

function App() {
  const [trendingGifs, setTrendingGifs] = useState(null)
  const inputRef = useRef(null)
  const [searchInput, updateSearchInput] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedGif, setSelectedGif] = useState(false)

  const fetchTrendingGifs = async() => {
    let trendingGifs = await getTrending()

    return {trendingGifs}
  }

  useEffect(() => {
    fetchTrendingGifs().then(response => {
      setTrendingGifs(response.trendingGifs)
    })

    return () => {
      setTrendingGifs(null)
    }
  }, [])

  const fetchSearchResults = async(text) => {
    let searchResults = await getSearchResults(text)

    return {searchResults}
  }

  useEffect(() => {
    // TODO add debounce
    console.log(`text is ${searchInput}`)
    fetchSearchResults(searchInput).then(response => {
      setSearchResults(response.searchResults)
    })
    
  }, [searchInput])

  const showModal = () => {
    setModalVisible(true)
  };

  const hideModal = () => {
    setModalVisible(false)
  };

  return (
    <div className="App">
      <div className="searchBox">
        <input className="searchInput"
          ref={inputRef}
          value={searchInput}
          onChange={(e) => updateSearchInput(e.currentTarget.value)}
          type="text" placeholder="Search for GIFs by name"
        />
      </div>
      <div className="gridContainer">
        {searchInput && searchInput.trim() ? 
          searchResults && searchResults.data && searchResults.data.map(item => {
            return <div className="gridElement" onClick={showModal}>
              <img src={item.images.fixed_height.url} />
            </div>
          })
        : 
        trendingGifs && trendingGifs.data && 
          trendingGifs.data.map(gif => { 
            return <div className="gridElement" onClick={showModal}>
              <img src={gif.images.fixed_height.url} />
            </div>
          }) 
        }
      </div>

      <Modal show={modalVisible} handleClose={hideModal}>
        <p>Modal</p>
      </Modal>

    </div>
  );
}

export default App;
