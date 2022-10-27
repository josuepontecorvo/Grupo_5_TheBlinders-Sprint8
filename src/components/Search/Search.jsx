import { useEffect, useRef, useState} from "react";
import noPoster from "../../assets/images/no-poster.png";

function Search() {
  // Credenciales de API

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("Ingrese condición de busqueda");

  useEffect(() => {
    let url
    if (keyword === "Ingrese condición de busqueda") {
        url = `https://theblinders-sprint7.herokuapp.com/api/productos`
    } else {
        url = `https://theblinders-sprint7.herokuapp.com/api/productos?search=${keyword}`
    }
    fetch(url)
      .then( response => response.json())
      .then( data => {
        if ( Array.isArray(data.data)) {
            setProducts(data.data)
        } else {
            setProducts([])
        }
        })
  }, [keyword])

  const search = useRef();

  function handleSubmit (e) {
    e.preventDefault();
    let value = search.current.value;
    setKeyword(value)
  };
  
  return (
    <div className="container-fluid">
     
        <>
          <div className="row my-4">
            <div className="col-12 col-md-6">
              {/* Buscador de Películas */}
              <form onSubmit={handleSubmit}>  {/* A esta etiqueta form debemos agregar el onSubmit con una funcion dentro */}
                <div className="form-group">
                  <label htmlFor="">Buscar por descripción:</label>
                  <input ref={search} type="text" className="form-control" />
                </div>
                <button className="btn btn-info">Search</button>
              </form>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col-12">
              <h2>Productos para la palabra: {keyword}</h2>
            </div>
            {/* Listado de Productos */}
            {/* Si hay productos mostrar el listado */}
            {products.length > 0 ? (
              products.map((product, i) => {
                return (
                  <div className="col-md-12 col-lg-6 col-xl-4 my-4 align-self-stretch" key={i}>
                    <div className="card shadow mb-4 h-100">
                      <div className="card-header py-3">
                        <h5 className="text-center m-0 font-weight-bold text-gray-800">
                          {product.description}
                        </h5>
                      </div>
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div className="text-center">
                          <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            // Si existe product.images, mostramos  product.images y si no mostramos la imagen local noPoster importada de los assets
                            src={
                                product.images
                                ? `https://theblinders-sprint7.herokuapp.com${product.images}`
                                : noPoster
                            }
                            alt={product.brand}
                            style={{
                              width: "400px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div>
                            <p className="text-center">Precio: {product.price}</p>
                            <p className="text-center">Descuento: {product.discount && 0} %</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Si no hay productos deberemos mostrar el siguiente mensaje
              <div className="alert alert-warning text-center">
                No se encontraron productos
              </div>
            )}
          </div>
        </>
    </div>
  );
}

export default Search;
