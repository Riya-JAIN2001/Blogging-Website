import React from 'react'

const input = ({htmlFor,labelText,name,type,value,handelChange}) => {
  return (
    <>
  <div className="form-group mb-2">
    <label htmlFor={htmlFor}>{labelText}</label>
    <input type={type} className="form-control" value={value} name={name} onChange={handelChange}/>
    
  </div>
</>

  )
}

export default input