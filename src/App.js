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
  const [selectedGif, setSelectedGif] = useState(null)

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
            return <div className="gridElement" onClick={()=> {showModal(); setSelectedGif(item);}}>
              <img src={item.images.fixed_height.url} />
            </div>
          })
        : 
        trendingGifs && trendingGifs.data && 
          trendingGifs.data.map(gif => { 
            return <div className="gridElement" onClick={()=> {showModal(); setSelectedGif(gif);}}>
              <img src={gif.images.fixed_height.url} />
            </div>
          }) 
        }
      </div>

      <Modal show={modalVisible} handleClose={hideModal}>
        { selectedGif &&  (<React.Fragment>
          <img src={selectedGif.images.original.url} />          
          {selectedGif.user && (<React.Fragment>
            <p>{`User: ${selectedGif.user.display_name}`}</p>
          <a href={selectedGif.user.profile_url}><img src={selectedGif.user.avatar_url} title={selectedGif.user.username} width="50"/></a>
          </React.Fragment>)
          }
          <p>{selectedGif.title}</p>
          <p><a href={selectedGif.url}>{selectedGif.url}</a></p>
          <p>{`Rating: ${selectedGif.rating}`}</p>
        </React.Fragment>)
        }
      </Modal>

    </div>
  );
}

export default App;
