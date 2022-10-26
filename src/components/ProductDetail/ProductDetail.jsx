import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

function ProductDetail() {

    const [product, setProduct] = useState({})
    const navigate = useNavigate();
    
    let { id } = useParams()
    useEffect(() => {
        let url = `https://theblinders-sprint7.herokuapp.com/api/productos/${id}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProduct(data.data)
            })
            
    }, [id])

    let descuento = ''
    if(product.discount > 0) {
        descuento = `Descuento: ${product.discount}%`
    }

    function handleDelete (e) {
        e.preventDefault()
        fetch(`https://theblinders-sprint7.herokuapp.com/api/productos/eliminar/${id}`, { method: 'delete', headers: { 'Content-Type': 'application/json' }})
           .then(res => res.json())
           .then(info => {
            if(info.meta.status === 200) {
                navigate('/dashboard')
            } else {
                alert(info.data)
            }
           })
    }

    return (
        <div className="m-auto col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">
                        Producto
                    </h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            style={{ width: 40 + "rem" }}
                            src={`https://theblinders-sprint7.herokuapp.com${product.Images}`}
                            alt={product.category}
                        />
                    </div>
                    <p className="text-center font-weight-bold text-gray-800">
                       {product.description}
                    </p>
                    <p className="font-weight-bold">
                       Precio: $ {product.price}
                    </p>
                    <p className="font-weight-bold">
                       {descuento}
                    </p>
                </div>
                <Link to={`/producto/editar/${id}`} className="btn btn-primary col-lg-12 mb-3">Editar</Link>
                <form onSubmit={handleDelete}>
                    <button type="submit" className="btn btn-danger col-lg-12 mb-3">Eliminar</button>
                </form>
            </div>
        </div>
    );
}

export default ProductDetail;