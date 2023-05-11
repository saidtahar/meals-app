import React from 'react'
import {useState} from "react"
import {useGlobalContext} from "../Context"

const Search = () => {
  const [text,setText] = useState("")

  const {setSearchTerm , fetchRandomMeal} = useGlobalContext()

  const handleChange =(e)=>{
    setText(e.target.value)
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(text){setSearchTerm(text)
    }
  }
  const handleRandomMeal =()=>{
    setSearchTerm("")
    setText("")
    fetchRandomMeal()

  }
  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='type favorite meal' value={text} onChange={handleChange} onKeyUp={handleSubmit} className='form-input'/>
        <button type='submit' className='btn'>search</button>
        <button type='button' className='btn btn-hipster' onClick={handleRandomMeal}>surprise-me</button>
      </form>
    </header>
  )
}

export default Search