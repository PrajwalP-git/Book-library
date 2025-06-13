import { useState } from "react";
import axios from 'axios';

const SearchBooks= ({onBookAdded})=>{
    const [query, setQuery]=useState("");
    const [results, setResults]=useState([]);
    const [loading, setLoading]=useState(false);

    const SearchBooks=async()=>{
        if (!query) return;
        setLoading(true);
        try {
            const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${query}`
        );
         setResults(res.data.items || []);
        } 
        catch (err) {
            console.error("Error fetching books:", err);
        }   
        finally {
         setLoading(false);
    }
  };

  const addBookToLibrary = async (book) => {
    const info = book.volumeInfo;
    const newBook = {
      title: info.title || "Untitled",
      author: info.authors ? info.authors[0] : "Unknown",
      genre: info.categories ? info.categories[0] : "General",
      published_date: info.publishedDate || "2000-01-01",
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/books/", newBook);
      alert("Book added!");
      if (onBookAdded) onBookAdded(res.data);
    } catch (err) {
      console.error("Failed to add book:", err);
      alert("Error adding book");
    }
  };

  return (
    <div>
      <h2>Search & Add Real Books</h2>
      <input
        type="text"
        value={query}
        placeholder="Enter book title"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={SearchBooks}>Search</button>

      {loading && <p>Loading...</p>}
      <ul>
        {results.map((book) => (
          <li key={book.id}>
            <strong>{book.volumeInfo.title}</strong> by{" "}
            {book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown"}
            <button onClick={() => addBookToLibrary(book)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBooks;

