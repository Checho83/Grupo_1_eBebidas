import React, { useState, useEffect, useRef } from 'react';

// import noPoster from '../assets/images/no-poster.jpg';

function UsersInDb() {
	// const [nombre_del_estado, funcion_actualizacion_del_estado] = useState(estado_inicial);
	const [users, setUsers] = useState([]); // Almacenar y modificar estados / variables.

	const inputKeyword = useRef();

	useEffect(() => {
		// Petición Asincrónica al montarse el componente
		const endpoint = '/api/users/';


		fetch(endpoint)
				.then(response => response.json())
				.then(data => {
					console.log(data.users);
 					if (!data.Error) {
						setUsers(data.users);

					} 
				})
				.catch(error => console.log(error));		
	}, []);

	useEffect(() => {
	},[users])

/* 	const searchMovie = async event => {
		event.preventDefault();
		const inputValue = inputKeyword.current.value;
		setKeyword(inputValue);
		inputKeyword.current.value = '';
	}; */

	return(
		<div className="container-fluid">
		
		<div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Usuarios en la base de datos
          </h5>
        </div>
				<>

					<div className="row">

						{/* Listado de películas */}
						{
							users.length > 0 && users.map((user, i) => {
								return (
									
									
									
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">Nombre: {user.firstName}</h5>
												<h5 className="m-0 font-weight-bold text-gray-800">Apellido: {user.lastName}</h5>
												{/* <h5 className="m-0 font-weight-bold text-gray-800">{user.avatar}</h5> */}
											</div>
											<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={'http://localhost:3030/images/users/' + user.avatar}
													
														style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
													/>
												</div>
											<div className="card-body">

	
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
				
				</>
	

		</div>
	)
}

export default UsersInDb;
