/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="mx-auto max-w-2xl p-5">
        <h1 className="text-3xl font-medium text-center my-5">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={handleChange}
            className="focus:outline-none rounded-lg p-3"
            placeholder="Username"
            type="text"
            name="userName"
            id="userName"
          />
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
            Sign Up
          </button>
        </form>
        <span>
          Already had an account?{" "}
          <Link className="text-sky-600 font-medium" to="/sign-in">
            Sign In
          </Link>
        </span>
        {error && <p className="text-red-600 mt-5">{error}</p>}
      </div>
    </>
  );
}
