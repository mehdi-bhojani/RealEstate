
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { signInStart,signInFailure, signInSuccess } from "../redux/user/userSlice";


export default function Signin() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        
        return;
      }
      dispatch(signInSuccess(data));
      
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
      
    }
  };
  return (
    <>
      <div className="mx-auto max-w-2xl p-5">
        <h1 className="text-3xl font-medium text-center my-5">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={handleChange}
            className="focus:outline-none rounded-lg p-3"
            placeholder="Email"
            type="email"
            name="email"
            id="email"
          />
          <input
            onChange={handleChange}
            className="focus:outline-none rounded-lg p-3"
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />
          <button
            className="disabled:opacity-80 rounded-lg my-5 bg-slate-500 p-3 text-white uppercase font-medium hover:bg-slate-400"
            type="submit"
          >
            {(loading)?"Loading":"Sign In"}
          </button>
        </form>
        <span>
          Dont had an account?{" "}
          <Link className="text-sky-600 font-medium" to="/sign-up">
            Sign Up
          </Link>
        </span>
        {error && <p className="text-red-600 mt-5">{error}</p>}
      </div>
    </>
  );
}
