import { useRef } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../redux/state/user";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let inputEmail = useRef()
    let inputPassword = useRef()
    let feedback = useRef()

    function handleSubmit() {

        let username = inputEmail.current.value
        let password = inputPassword.current.value
        let credentials = {username, password}
        console.log(credentials)
        fetch("http://localhost:3000/api/usuarios/ingresar", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify(credentials)})
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    feedback.current.innerText = 'Credenciales invalidas'
                } else {
                    feedback.current.innerText = ''
                    dispatch(createUser({...data.data}))
                    navigate("/dashboard")
                }
            })


        

    }

    return (
    <div className="container vh-100 d-flex align-items-center">
        <div className="col-8 mx-auto position-relative">
            <h2 className="text-center my-5">Login</h2>
            <div className="mb-3 row">
                <label for="staticEmail" className="col-lg-2 col-form-label">Email</label>
                <div className="col-lg-10">
                    <input ref={inputEmail} type="text" className="form-control" id="inputEmail" placeholder="email@example.com" />
                </div>
            </div>
            <div className="mb-3 row">
                <label for="inputPassword" className="col-lg-2 col-form-label">Password</label>
                <div className="col-lg-10">
                    <input ref={inputPassword} type="password" className="form-control" id="inputPassword" />
                </div>
            </div>
            <small ref={feedback} className="w-100 text-center position-absolute text-danger"></small>
            <div className="d-flex mt-5">
                <button type="submit" onClick={handleSubmit} className="btn btn-primary col-lg-12">Confirm</button>
            </div>
        </div>
    </div>
    )
}
export default Login