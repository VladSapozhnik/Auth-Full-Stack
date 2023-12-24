import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../store/authSlice";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = async (e) => {
    e.preventDefault();

    try {
      if (e.target[0].value.length && e.target[1].value.length) {
        const username = e.target[0].value;
        const password = e.target[1].value;
        
        await dispatch(fetchLogin({username, password}));
        
        const hash = await localStorage.getItem("hash");

        if (hash) {
          navigate("/tests");
        }
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className="bg-dark h-100" onSubmit={auth}>
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <form action="" className="d-flex flex-column w-50">
          <h2 className="h2 mb-4">Auth Form</h2>
          <input type='text' name='username' className="mb-3" placeholder="username" defaultValue="username" />
          <input type="password" name="password" className="mb-3" placeholder="password" defaultValue="username" />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default AuthForm;