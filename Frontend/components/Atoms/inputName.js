import React from 'react'

function Input({type,name,value,handleChange,id,className}) {
  return (
    <input autoFocus required type={type} name={name} value={value} onChange={handleChange} id={id} className={className} />    
  )
}

export default Input