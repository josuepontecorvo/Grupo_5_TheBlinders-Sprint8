import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function UserDetail() {

    const [user, setUser] = useState({})
    
    let { id } = useParams()
    useEffect(() => {
        let url = `https://theblinders-sprint7.herokuapp.com/api/usuarios/${id}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setUser(data.data)
            })
            
    }, [id])


    return (
        <div className="m-auto col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">
                        Usuario
                    </h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            style={{ width: 40 + "rem" }}
                            src={`https://theblinders-sprint7.herokuapp.com${user.image}`}
                            alt={user.email}
                        />
                    </div>
                    <p className="text-center font-weight-bold text-gray-800">
                       {`${user.firstName} ${user.lastName}`}
                    </p>
                    <p className="font-weight-bold">
                       Email: {user.email}
                    </p>
                    <p className="font-weight-bold">
                       {user.birthdate}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;