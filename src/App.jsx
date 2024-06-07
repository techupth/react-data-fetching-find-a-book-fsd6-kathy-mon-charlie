import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState([]);
  const getData = async (word) => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${word}`
      );
      setData(result?.data.items ?? []);
    } catch (error) {
      setData([]);
    }
  };
  useEffect(() => {
    word ? getData(word) : setData([]);
  }, [word]);
  return (
    <div className="App">
      {/* start coding here */}
      <h1>Find a Book</h1>
      <input
        placeholder="search me"
        value={word}
        onChange={(event) => {
          setWord(event.target.value);
        }}
      />
      <ul>
        {data
          .filter((item) =>
            item.volumeInfo?.title.toLowerCase().includes(word.toLowerCase())
          )
          .map((item, index) => (
            <li key={index}>{item.volumeInfo?.title}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
