import './App.css';
import { useState, useEffect } from 'react';
import React from "react";
import moment from 'moment';

function App() {
  const [products, setProducts] = useState()
  const [searchProduct, setSearchProduct] = useState("");
  const [searchResults,  setSearchResults] = useState([]);
  const [checked, setChecked] = useState(false);
  useEffect(()=>{
    fetch("http://localhost/ria_api_php/")
    .then(request => request.json())
    .then(data => {
      setProducts(data.data)
      console.log(data)
      
    })
  },[])
  useEffect(()=>{
    if(products){
      const filtered = products.filter(product => {
        return product.nom.toLowerCase().includes(searchProduct.toLowerCase())
      })
      setSearchResults(filtered);
    }
  },[searchProduct, products])

  const handleChange = () => {
    setChecked(!checked);
  };
 
  const handlePriceChange = (e, productId) =>{
    console.log(e.target.value, productId)
    const newProducts = products.map(product=>{ 
      if(product.id === productId){
        const newProduct = {...product, dateUp: moment().format("YYYY-MM-DD HH-mm-ss"), prix: e.target.value} // ... extraction des propriétés : destructuring 
        fetch(`http://localhost/ria_api_php/${productId}`,{
          method: 'PATCH',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(newProduct)
        })
          .then(request => request.json())
          .then(data => {
        console.log(data)
      
    })
        return newProduct
      }
      return product
    })
    setProducts(newProducts)
  };

  return (
    <div className="App">
      <nav className="ui secondary  menu">
        <div className="item">
          Rest API | REACT JS
        </div>
        <label>
          <input type="checkbox" checked={checked}  onChange={handleChange}/>
            Modifier ?
        </label>
      </nav>
      <main className="ui container">
        <form className="ui form" id="search-form">
          <div className="field">
            <label htmlFor="el-name">Search element</label>
            <input
              type="text"
              placeholder="Search"
              value={searchProduct}
              onChange={(e)=> {setSearchProduct(e.target.value)}}
            />
          </div>
          {/* <button className="ui primary button" type="submit">Search</button> */}
        </form>

        <table className="ui striped table" id="result">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col">Date Ajout</th>
              <th scope="col">Date MAJ</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(productSearch =>(
                <tr key={productSearch.id}>
                  <td>{productSearch.id}</td>
                  <td>{productSearch.nom}</td>
                  <td>{productSearch.description}</td>
                  <td>{productSearch.dateIn}</td>
                  <td>{productSearch.dateUp}</td>
                  <td>{
                        checked ? 
                        <input type="number" value={productSearch.prix} onChange={(e)=>{handlePriceChange(e, productSearch.id)}}/> : 
                        productSearch.prix
                        // condition ? then : else terner REACT
                        // condition && then 

                  }</td>
                </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
