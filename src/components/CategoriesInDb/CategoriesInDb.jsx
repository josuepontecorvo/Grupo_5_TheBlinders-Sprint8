import { useEffect, useState } from "react";
function CategoriesInDb() {

    const [categories, setCategories] = useState({})

    useEffect(() => {
        let url = 'http://theblinders-sprint7.herokuapp.com/api/productos'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCategories(data.meta.totalByCategory)
            })
            
    }, [])


    let bicicletas = {
        name: 'Bicicletas',
        quantity: categories.bicicletas
    }

    let accesorios = {
        name: 'Accesorios',
        quantity: categories.accesorios
    }

    let categoriesInDb = [bicicletas, accesorios]

    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">
              Categorias en la base de datos
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              {categoriesInDb.map((category, i) => (
                <div className="col-lg-6 mb-4" key={i}>
                  <div className="card bg-dark text-white shadow">
                    <div className="card-body">{category.name}: {category.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CategoriesInDb;