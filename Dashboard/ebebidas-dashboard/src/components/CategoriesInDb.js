import React, { useState, useEffect, useRef } from 'react';

function CategoriesInDb() {

  const [products, setProducts] = useState([]);


  useEffect(() => {
		// Petición Asincrónica al montarse el componente
		const endpoint = '/api/products/';

		fetch(endpoint)
				.then(response => response.json())
				.then(data => {
					
 					if (!data.Error) {
						setProducts(data.countByCategory);      //traigo las categorias
					} 
				})
				.catch(error => console.log(error));		
	}, []);


  
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categorias en la base de datos
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
         { 
          products.length > 0 && products.map((product, i) => {
            return(
            <div className="col-lg-6 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">{product.name}:  {product.total} </div>
                
              </div>
            </div>)
              })
          }  


          </div>
        </div>
      </div>
    </div>
  );

}

export default CategoriesInDb;
