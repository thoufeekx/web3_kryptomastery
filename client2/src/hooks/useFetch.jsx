// import { useEffect, useState } from "react"

// const API_KEY = import.meta.VITE_GIPHY_API;

// const useFetch = ({keyword}) =>{
//     const [gifUrl, setGifUrl] = useState('');

//     const fetchGifs = async () => {
//         try 
//         {
//             const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&q=${keyword.split('').join('')}&limit=1`)

//             const {data} = await response.json()

//             setGifUrl(data[0]?.images?.downsized_medium?.url)
//         } 
//         catch (error) 
//         {
//             setGifUrl('https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif')
//         }
//     }

//     useEffect( () => {
//         if(keyword) fetchGifs();
//     }, [keyword])

//     return gifUrl;

// }

// export default useFetch

import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
      setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;