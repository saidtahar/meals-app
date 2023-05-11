import React from 'react'
import "./Card.css"

const Card = (props) => {
  return (
    <div className='card-container'>
        <p >id is :{props.id} </p>
        <p>name is : {props.name}</p>
       <div> <img className='card-img' src={props.img} /></div>
    </div>
  )
}

export default Card