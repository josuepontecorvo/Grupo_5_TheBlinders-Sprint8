import { useSelector } from "react-redux";
import foto from "../../assets/images/default-user.png"

function Header() {
    const userState = useSelector((store) => store.user);

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            

            {/*<!-- Topbar Navbar -->*/}
            <ul className="navbar-nav ml-auto">
                              

                {/*<!-- Nav Item - User Information -->*/}
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="/" id="userDropdown">
                        <span className="mr-2 d-lg-inline text-gray-600 small">
                            {userState.email ? userState.email : "Invitado"}
                        </span>
                        {userState.image ? 
                        <img
                            className="img-profile rounded-circle"
                            src={`http://localhost:3000/images/users/${userState.image}`}
                            alt="User"
                            width="60"
                        /> :
                        <img
                            className="img-profile rounded-circle"
                            src={foto}
                            alt="User"
                            width="60"
                        />

                        }
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Header