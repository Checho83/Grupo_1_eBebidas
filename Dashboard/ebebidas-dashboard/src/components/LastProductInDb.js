import React, { useState, useEffect, useRef } from 'react';
import ChartRow from './ChartRow';


function LastProductInDb(){

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
		// Petición Asincrónica al montarse el componente
		const endpoint = '/api/products/';

		fetch(endpoint)
				.then(response => response.json())
				.then(data => {	
 					if (!data.Error) {
						setProducts(data.products);      //traigo las categorias
                        setIsLoading(false);
					} 
				})
				.catch(error => console.log(error));		
	}, []);


    if (isLoading) {
        return (
          <div className="App">
            <h1>Cargando...</h1>
          </div>
        );
    } else{
        return (
            /* <!-- DataTales Example --> */
            <div className="col-lg-6 mb-4">      
            <div className="card shadow mb-4">
                <div className="card-body">
                <div><h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto de la base de datos</h5></div>
                <br></br>
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Marca</th>
                                    <th>Categoria</th> 
                                </tr>
                            </thead>
    
                            <tbody>
    
                                      <ChartRow { ...products[products.length -1]} key={50} /> 
    
                            </tbody>
                            
                        </table>
                    </div>
                    <a className="btn btn-danger" target="/DetailProduct" rel="nofollow" href="/DetailProduct">Ver detalle del producto</a>
                </div>
            </div>
            </div>
    
        )
    }

    
    
    
    
    /* (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={imagenFondo} alt=" Star Wars - Mandalorian "/>
                    </div>
                  
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
                </div>
            </div>
        </div>
    ) */
}

export default LastProductInDb;
