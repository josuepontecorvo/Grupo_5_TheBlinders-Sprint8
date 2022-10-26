import { NavLink } from "react-router-dom";

function UserChartRow(props) {
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td><NavLink to={`/usuarios/detalle/${props.id}`} >Detalle</NavLink></td>
      </tr>
    );
  }
  
  export default UserChartRow;