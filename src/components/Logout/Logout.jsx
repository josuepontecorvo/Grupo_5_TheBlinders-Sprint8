import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLocalStorageUser, resetUser } from "../../redux/states/user";


function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick(){
    clearLocalStorageUser();
    dispatch(resetUser());
    navigate("/")

  }
  return (
    <button onClick={handleClick} className="w-100">Log Out</button>
  )
}
export default Logout