import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLocalStorageUser, resetUser } from "../../redux/state/user";


function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick(){
    clearLocalStorageUser();
    dispatch(resetUser());
    navigate("/")

  }
  return (
    <button onClick={handleClick}>Log Out</button>
  )
}
export default Logout