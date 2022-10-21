import { NavLink } from "react-router-dom";

function ChartRow(props) {
    return (
      <tr>
        <td>{props.brand}</td>
        <td>{props.model}</td>
        <td>{props.description}</td>
        <td>{props.price}</td>
        <td>{props.discount}</td>
        <td><NavLink to={`/detalle/${props.id}`} >Detalle</NavLink></td>
      </tr>
    );
  }
  
  export default ChartRow;
  