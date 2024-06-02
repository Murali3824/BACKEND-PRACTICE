import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'
// import { useEffect } from 'react'

function App() {
  const [jok, setJok] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
    .then((response) => {
      setJok((response.data))
    }) 
    .catch((error) => {
      console.log(error);
    })
  })
  return (
    <>
      <h1>BACKEND </h1>
      <p>JOKES:{jok.length}</p>
      {
        jok.map((joke,index) => (
          <div key={joke.id}>
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))
      } 
    </>
  )
}

export default App
