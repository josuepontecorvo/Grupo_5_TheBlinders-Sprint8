import { useEffect, useState } from "react";
import { UserChartRow } from "../../components/UserChartRow";


function Chart (){
    const [users, setUsers] = useState([])

    useEffect(() => {
        let url = 'https://theblinders-sprint7.herokuapp.com/api/usuarios'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setUsers(data.data)
            })
            
    }, [])
    
    return (
        <>
            <h2>Listado de Usuarios</h2>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                users.map( ( row , i) => {
                                    return <UserChartRow { ...row} key={i}/>
                                })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>                   
    )
}

export default Chart;