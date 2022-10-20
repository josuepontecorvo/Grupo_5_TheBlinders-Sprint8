
function LastProductInDb(props) {
    let descuento = ''
    if(props.discount > 0) {
        descuento = `Descuento: ${props.discount}%`
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
                            src={`http://localhost:3000${props.Images}`}
                            alt={props.category}
                        />
                    </div>
                    <p className="text-center font-weight-bold text-gray-800">
                       {props.description}
                    </p>
                    <p className="font-weight-bold">
                       Precio: $ {props.price}
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