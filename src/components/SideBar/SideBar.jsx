import { Link } from "react-router-dom";

import image from "../../assets/images/logo-BM.png";
import { Logout } from "../Logout";

function SideBar() {
  return (
    <ul
      className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/*<!-- Sidebar - Brand -->*/}
      <Link to="/">
        <div className="sidebar-brand-icon">
          <img className="w-100" src={image} alt="BiciMundo" />
        </div>
      </Link>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider my-0" />

      {/*<!-- Nav Item - Dashboard -->*/}
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider" />

      {/*<!-- Heading -->*/}
      <div className="sidebar-heading">Actions</div>

      {/*<!-- Nav Item - Login-->*/}
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="fas fa-fw fa-table"></i>
          <span>Admin-Login</span>
        </Link>
      </li>

      {/*<!-- Nav Item - Products list -->*/}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/productos">
          <i className="fas fa-fw fa-folder"></i>
          <span>Productos</span>
        </Link>
      </li>

      {/*<!-- Nav Item - Last Product in DB -->*/}
      <li className="nav-item">
        <Link className="nav-link" to="/ultimoproducto">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Último Producto</span>
        </Link>
      </li>

      {/*<!-- Nav Item - Stats -->*/}
      <li className="nav-item">
        <Link className="nav-link" to="/estadisticas">
          <i className="fas fa-fw fa-film"></i>
          <span>Estadísticas</span>
        </Link>
      </li>


      {/*<!-- Nav Item - Product Create -->*/}
      <li className="nav-item">
        <Link className="nav-link" to="/producto/crear">
          <i className="fas fa-fw fa-table"></i>
          <span>Crear Producto</span>
        </Link>
      </li>
      
      {/*<!-- Nav Item - User List -->*/}
      <li className="nav-item">
        <Link className="nav-link" to="/usuarios">
          <i className="fas fa-fw fa-table"></i>
          <span>Usuarios</span>
        </Link>
      </li>

      <li className="nav-item">
        <Logout></Logout>
      </li>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default SideBar;