import './App.css'
import { useState, useEffect } from 'react'

/* 
This file contains the entire application UI. Try refactoring it using the `SearchForm`
and `SearchResults` components to break up the application's UI logic.
*/

const JOKE_API_URL = "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";

// URL constructor helper function
const getApiUrlWithQuery = (query = '') => {
  return JOKE_API_URL + `&contains=${query}`
};

// Fetching helper function
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function App() {

  const [userInput, setUserInput] = useState('');
  const [joke, setJoke] = useState({ delivery: '', setup: ''});

  useEffect(() => {
    // React wants us to define this function rather than call async code directly
    const doFetch = async () => { 
      const url = getApiUrlWithQuery(userInput);
      const responseData = await fetchData(url);

      if (responseData) {
        const { delivery, setup } = responseData;
        setJoke({ delivery, setup });
      }
    }
    doFetch(); // and we just call the function immediately

  }, [userInput]); // re-run the effect when `query` changes

  const handleInputChange = (e) => setUserInput(e.target.value);

  return (
    <>
      <form>
        <input onChange={handleInputChange} type="text" placeholder="query" value={userInput}></input>
        <input type="submit" value="submit"></input>
      </form>
      
      <div className='results'>
        <h1>{joke.setup}</h1>
        <details><summary>Reveal</summary>
        
        <p>{joke.delivery}</p>

        </details>
      </div>
    </>
  );
}

export default App
