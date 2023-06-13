import React from 'react'

function Submit({id,handleSubmit,required, className,value}) {
  return (
          <input type="submit" name id={id} onClick={handleSubmit} required={required} className={className} value={value}/>
  )
}

export default Submit