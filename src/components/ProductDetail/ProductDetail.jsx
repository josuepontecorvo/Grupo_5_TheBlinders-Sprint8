import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ProductDetail() {

    const [product, setProduct] = useState({})
    
    let { id } = useParams()
    useEffect(() => {
        let url = `http://localhost:3000/api/productos/${id}`
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

    return (
        <div className="m-auto col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">
                        Ultimo producto en la base de datos
                    </h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            style={{ width: 40 + "rem" }}
                            src={`http://localhost:3000${product.Images}`}
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
            </div>
        </div>
    );
}

export default ProductDetail;