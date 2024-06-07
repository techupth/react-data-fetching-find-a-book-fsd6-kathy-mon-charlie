import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    searchText && searchFromServer(searchText);
  }, [searchText]);
  

  const searchFromServer = async (text) => {
    try {
      const response =
        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}
`);
      setSearchResult(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Find a book</h1>
      <input type="text" onChange={(i) => setSearchText(i.target.value)} />
      {searchResult.length > 0 && (
        <>
          {searchResult.map((result, index) => (
            <div key={index} className="searchItem">
              <li className="result">{result.volumeInfo.title}</li>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
