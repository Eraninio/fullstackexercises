import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [book, setBook] = useState([]);
  const [name, setName] = useState();
  const [number, setNumber] = useState();

  const showPersonsList = async () => {
    const { data } = await axios.get('http://localhost:3001/api/persons')
    setBook(data);
  }

  useEffect(() => {
    showPersonsList();
  }, [])

  const handleDelete = (e) => {
    axios.delete(`http://localhost:3001/api/persons/${e.target.id}`)
    showPersonsList();
  }

  const handleSubmit = async () => {
    await axios.post('http://localhost:3001/api/persons', {
      name, 
      number
    })
    showPersonsList();
  }

  return (
    <div className="App">
      <h1>Phone Book</h1>
      <ul>
        {book.map(item => 
          <li>{item.name} {item.number} <button id={item.id} onClick={handleDelete}>delete</button></li>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} type='text' placeholder='name'/>
        <input onChange={(e) => setNumber(e.target.value)} type='text' placeholder='number'/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;