import { useEffect, useState } from "react"

function LastProductInDb() {
    const [lastProduct, setLastProduct] = useState({})

    useEffect(() => {
        let url = 'https://theblinders-sprint7.herokuapp.com/api/productos/ultimo'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setLastProduct(data.data)
            })
            
    }, [])

    let descuento = ''
    if(lastProduct.discount > 0) {
        descuento = `Descuento: ${lastProduct.discount}%`
    }

    return (
        <div className="col-lg-6 mb-4">
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
                            src={`https://theblinders-sprint7.herokuapp.com${lastProduct.Images}`}
                            alt={lastProduct.category}
                        />
                    </div>
                    <p className="text-center font-weight-bold text-gray-800">
                       {lastProduct.description}
                    </p>
                    <p className="font-weight-bold">
                       Precio: $ {lastProduct.price}
                    </p>
                    <p className="font-weight-bold">
                       {descuento}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LastProductInDb;