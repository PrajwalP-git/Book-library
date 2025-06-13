import { useState, useEffect } from "react";
import axios from "axios";

const Addbook = ({ onBookAdded, editingBook, onBookUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    published_date: '',
  });

  // Load existing book data for editing
  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.title || !formData.author || !formData.genre || formData.published_date){
      alert("All fields are required.");
      return;
    }

    try {
      if (editingBook) {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/books/${editingBook.id}/`,
          formData
        );
        alert('Book updated!');
        onBookUpdated(res.data);
      } else {
        // POST request for create
        const res = await axios.post(
          'http://127.0.0.1:8000/api/books/',
          formData
        );
        alert('Book added!');
        setFormData({ title: '', author: '', genre: '', published_date: '' });
        if (onBookAdded) onBookAdded(res.data);
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingBook ? 'Edit Book' : 'Add a New Book'}</h2>

      <label>Title</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Author</label>
      <input
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <label>Genre</label>
      <input
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />

      <label>Published Date</label>
      <input
        type="date"
        name="published_date"
        value={formData.published_date}
        onChange={handleChange}
        required
      />

      <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
    </form>
  );
};

export default Addbook;
