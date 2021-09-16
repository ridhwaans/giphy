import axios from "axios"

export async function getTrending() {

    return await axios.get(`${process.env.REACT_APP_GIPHY_BASE_URL}/gifs/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`)
        .then(function (response) {
            return response.data
        })
        
}

export async function getSearchResults(q) {

    return await axios.get(`${process.env.REACT_APP_GIPHY_BASE_URL}/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${q}`)
        .then(function (response) {
            return response.data
        })
        
}