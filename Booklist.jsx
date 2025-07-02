import React,{useEffect, useState} from 'react';
import Addbook from './Addbook';
import axios from 'axios';

const BookList=()=>{
    const[books, setBooks]=useState([]);
    const[editingBook, setEditingBook]=useState(null);
    const[searchQuery, setSearchQuery]=useState('');
    const[message, setMessage]=useState('');

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/books/')
        .then(res=> setBooks(res.data))
        .catch(err=> console.error("Error fetching books:",err))
    }, []);

    const handleDelete= async(id)=>{
        try{
            await axios.delete(`http://127.0.0.1:8000/api/books/${id}/`);
            setBooks(books.filter(book=>book.id !==id));
        }
        catch(err){
            console.error("Delete failed:", err);
        }
    }

    const handleSearch= async(e)=>{
        const query=e.target.value;
        setSearchQuery(query);

        if(query.length<3 || !/[a-zA-Z]{3}/.test(query)){
            setMessage("Please enter at least 3 alphabetic characters.");
            setBooks([]);
            return;
        }

        try{
            const res= await axios.get(`http://127.0.0.1:8000/api/books/?q=${query}`);
            setBooks(res.data);
            setMessage('');
        }
        catch(err){
            setBooks([]);
            setMessage(err.response?.data?.error || "Something went wrong");
        }
    }

    const handleEdit= (book)=>{
        setEditingBook(book);
    }

    const handleBookUpdated= (updatedBook)=>{
        setBooks(books.map(b=>(b.id===updatedBook.id ? updatedBook:b)));
        setEditingBook(null);
    }
    return(
        <div>
            {editingBook && (
                <Addbook
                  editingBook={editingBook}
                  onBookUpdated={handleBookUpdated}
                />
            )}
            <h2>Books List</h2>
            
            <ul>
                {books.map(book=>(
                    <li key={book.id}>
                        <h3>{book.title}</h3>
                        <p>
                            <strong>Author:</strong> {book.author}
                        </p>
                        <p>
                            <strong>Genre:</strong> {book.genre}
                        </p>
                        <p>
                            <strong>Published:</strong> {book.published_date}
                            <button onClick={()=> handleEdit(book)}>Edit</button>
                            <button onClick={()=> handleDelete(book.id)}>Delete</button>
                        </p>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BookList;
