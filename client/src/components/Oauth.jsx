import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

function Oauth() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider);

            console.log(result);
            const res = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');        
        } catch (error) {
            console.log("Error by google auth, "+error)
        }
    } 
  return (
    <>
        <button onClick={handleGoogleClick} type='button' className="bg-red-700 p-3 mb-3 text-white rounded-lg uppercase font-medium hover:opacity-85" >Continue With Google</button>
    </>
  )
}

export default Oauth