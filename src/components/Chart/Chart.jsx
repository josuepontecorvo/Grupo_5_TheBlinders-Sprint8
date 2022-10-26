import { useEffect, useState } from "react";
import {ChartRow} from "../ChartRow";


function Chart (){
    const [products, setProducts] = useState([])

    useEffect(() => {
        let url = 'http://theblinders-sprint7.herokuapp.com/api/productos'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data)
            })
            
    }, [])
    
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            products.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;