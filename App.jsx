import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BookList from './Components/Booklist';
import Addbook from './Components/Addbook';
import SearchBooks from './Components/SearchBooks';
import './index.css';

function App() {
  const[books, setBooks]= useState([]);

  useEffect(()=>{
    fetchBooks();
  }, []);

  const fetchBooks= async()=>{
    const res= await axios.get('http://127.0.0.1:8000/api/books');
    setBooks(res.data);
  };

  const handleBookAdded=(newBook)=>{
    setBooks([...books, newBook]);
  }
  return (
    <div>
      <h1>My Book Library</h1>
      <BookList/>
      <SearchBooks onBookAdded={(newBook)=>setBooks([...books, newBook])}/>
      <Addbook/>
    </div>
  )
}

export default App;
