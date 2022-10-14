import React, { useState, useEffect, useRef } from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */


function ContentRowDb(){

    const [users, setUsers] = useState([]); // Almacenar y modificar estados / variables.
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

	const inputKeyword = useRef();

    let totalUsers = {
        title: 'Total de usuarios',
        color: 'primary', 
        cuantity: users.count,

        icon:'fa-user-check'
    }

    let totalProducts = {
        title:' Total de productos', 
        color:'success', 
        cuantity: products,
        icon:'fa-award'
    }

    let totalCategories = {
        title:'Total de categorias' ,
        color:'danger',
        cuantity: categories.length,
        icon: 'fa-clipboard-list'
    }





    let cartProps = [totalUsers, totalProducts , totalCategories];


	useEffect(() => {
		// Petición Asincrónica al montarse el componente
		const endpoint = '/api/users/';

		fetch(endpoint)
				.then(response => response.json())
				.then(data => {
					console.log(data.users);
 					if (!data.Error) {
						setUsers(data.meta);

					} 
				})
				.catch(error => console.log(error));		
	}, []);

    useEffect(() => {
		// Petición Asincrónica al montarse el componente
		const endpoint = '/api/products/';

		fetch(endpoint)
				.then(response => response.json())
				.then(data => {
					console.log(data);
 					if (!data.Error) {
						setProducts(data.count);
					} 
				})
				.catch(error => console.log(error));		
	}, []);

    useEffect(() => {
		// Petición Asincrónica al montarse el componente
		const endpoint = '/api/products/';

		fetch(endpoint)
				.then(response => response.json())
				.then(data => {
					console.log(data);
 					if (!data.Error) {
						setCategories(data.countByCategory);
					} 
				})
				.catch(error => console.log(error));		
	}, []);


    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowDb;