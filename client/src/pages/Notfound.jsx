import React from 'react'
import { Link } from 'react-router-dom'
const Notfound = () => {
  return (
    <div>Notfound
        <Link className='btn btn-success' to="/">GO Back</Link>
    </div>
  )
}

export default Notfound