import React, { useEffect, useState } from 'react'
import { Card } from '../Card'


function ContentRowDb() {
    const [products, setProducts] = useState(0)
    const [users, setUsers] = useState(0)
    const [categories, setCategories] = useState({})

    useEffect(() => {
        let urlProductos = 'http://theblinders-sprint7.herokuapp.com/api/productos'
        let urlUsuarios = 'http://theblinders-sprint7.herokuapp.com/api/usuarios'
        fetch(urlProductos)
            .then(response => response.json())
            .then(data => {
                setProducts(data.meta.total)
                setCategories(data.meta.totalByCategory)
            })
        fetch(urlUsuarios)
            .then(response => response.json())
            .then(data => {
                setUsers(data.meta.total)
            })

    }, [])

    let productsCard = {
        title: "Productos en la base de datos",
        color: "primary",
        quantity: products,
        icon: "fa-light fa-bicycle",
      };
      
      /* <!-- Total awards --> */
      
      let usersCard = {
        title: "Total de usuarios",
        color: "success",
        quantity: users,
        icon: "fa-user-check",
      };
      
      /* <!-- Actors quantity --> */

      let totalCategories = Object.keys(categories)
      
      let categoriesCard = {
        title: "Cantidad de categorias",
        color: "warning",
        quantity: totalCategories.length,
        icon: "fa-clipboard-list",
      };

      let cardProps = [productsCard, usersCard, categoriesCard];

    return (
        <div className='row'>
            {cardProps.map( (card, i) => {
                return <Card {...card} key={i}/>
            })}
            
        </div>
    )
}

export default ContentRowDb