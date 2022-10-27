import { useEffect, useState } from "react";
import {ChartRow} from "../ChartRow";


function Chart (){
    const [products, setProducts] = useState([])
    const [meta, setMeta] = useState({})
    const [page,setPage] = useState(1)

    useEffect(() => {
        let url = `https://theblinders-sprint7.herokuapp.com/api/productos?page=${page}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data)
                setMeta(data.meta)
            })
            
    }, [page])

    const handleArrowLeft = () => {
        if(page > 1) {
            setPage((prev)=> --prev)
        }
    };
    const handleArrowRight = () => {
        if(meta.next !== "") {
            setPage((prev)=> ++prev)
        }
    };
    
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
                    <div className="container-fluid">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <button onClick={handleArrowLeft} className="mx-3 btn btn-secondary"><i className="fa-solid fa-arrow-left"></i></button>
                            <span className="px-3">- {page} -</span>
                            <button onClick={handleArrowRight} className="mx-3 btn btn-secondary"><i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Chart;