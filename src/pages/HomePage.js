import React from 'react';
import {Link} from 'react-router-dom';


function HomePage(){
  return(
    <div className="container">
      <h1>Home Page</h1>
      <p>
        <Link to='/inakidelamadrid'>inakidelamadrid</Link> on Github
      </p>
      <p>
        <Link to='/users'>React Hooks</Link> example page (CRUD users)
      </p>
    </div>
  )
}

export default HomePage
