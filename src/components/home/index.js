import './home.css';
import Headers from "../header/index";
import React from 'react';
import Products from '../products/index';
class Home extends React.Component {
  
  render() {
    return (

      <div className="Home">
        <Headers></Headers>
        <div  className="categoryheader">Category Name</div>
  <Products></Products>
        </div>
    );
  }
}

export default Home;