import { Link } from "react-router-dom";

export default function signup() {
  return (
    <>
        <div className="mx-auto max-w-2xl p-5">
        <h1 className="text-3xl font-medium text-center my-5">Sign Up</h1>
        <form className="flex flex-col gap-3">
            <input className="rounded-lg p-3" placeholder="Username" type="text" name="userName" id="UserName" />
            <input className="rounded-lg p-3" placeholder="Email" type="email"  name="email" id="email" />
            <input className="rounded-lg p-3" placeholder="Password" type="password" name="password" id="password" />
            <button className="rounded-lg my-5 bg-slate-500 p-3 text-white uppercase font-medium hover:bg-slate-400" type="submit">Sign Up</button>
        </form>
        <span>Already had an account? <Link className="text-sky-600 font-medium" to="/sign-in">Sign In</Link></span>
        </div>
    </>
  )
}
