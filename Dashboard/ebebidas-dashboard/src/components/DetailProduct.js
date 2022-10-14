import React, { useState, useEffect, useRef } from 'react';
import ChartRow from './ChartRowDetail';


function DetailProduct(){

    const [indexProduct, setindexProduct] = useState([]);
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

		// Petición Asincrónica al montarse el componente
		const endpoint = '/api/products/';
        let index;
        let endpointProduct;// = '/api/products/17';

		fetch(endpoint)
				.then(response => response.json())
				.then(data => {	
 					if (!data.Error) {
                        index  = data.products.length;
                      
                        endpointProduct = '/api/products/' + index;
                       // console.log(endpointProduct);
						setindexProduct(data.products.length - 1);      //traigo las categorias
                        //setIsLoading(false);
					} 
				})
                .then(()=>{
                
                console.log(endpointProduct);

                fetch(endpointProduct)
                .then(response => response.json())
                .then(data => {	
                    if (!data.Error) {
                        
                        console.log(data);
						setProduct(data.product);      //traigo las categorias
                        setIsLoading(false);
					} 
				})
				.catch(error => console.log(error))});		
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
                                    <th>Precio</th>
                                    <th>Descuento</th>
                                    <th>Oferta</th>
                                    <th>Stock</th>
                                    <th>Descripción</th>
                                    <th>Imagen</th>
                                    <th>Marca</th> 
                                    <th>Categoria</th> 
                                </tr>
                            </thead>
    
                            <tbody>
    
                                      <ChartRow { ...product} key={50} /> 
    
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}

export default DetailProduct;