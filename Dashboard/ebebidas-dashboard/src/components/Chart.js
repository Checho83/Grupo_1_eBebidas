import React, { useState, useEffect, useRef } from 'react';

import ChartRow from './ChartRow';




function Chart (){

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
		// Petición Asincrónica al montarse el componente
		const endpoint = '/api/products/';

		fetch(endpoint)
				.then(response => response.json())
				.then(data => {
				//	console.log(data);
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
        <div className="card shadow mb-4">
            <div className="card-body">
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
                        <tfoot>
                            <tr>
                                <th>id</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Marca</th>
                                <th>Categoria</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            
                            products.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
    }
}

export default Chart;