import React from 'react';


function ChartRowDetail(props){
    return (
                <tr>
                    <td>{props.id}</td>
                    <td>{props.name}</td>
                    <td>{props.price}</td>
                    <td>{props.discount}</td>
                    <td>{props.offer}</td>
                    <td>{props.stock}</td>
                    <td>{props.description}</td>
                    <td>{props.image}</td>
                    <td>{props.product_brand.name}</td>
                    <td>{props.product_category.name}</td>
                </tr>
            )
    }
    
        

export default ChartRowDetail;