/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const dispatch = useDispatch();
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleUserDelete = async () => {
    try {
      dispatch(deleteUserStart);
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data === false) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        return setListingError(data.message);
      }
      setUserListings(data);
    } catch (error) {
      return setListingError("Error Showing list");
    }
  };

  const handleListingDelete = async (id) =>{
    try {
      const res = await fetch(`/api/listing/delete/${id}`,{
        method : 'DELETE',
      });
      const data = res.json();
      if(data.success === false){
        console.log(data.message);
        return;
      }
      setUserListings((prev)=> prev.filter((listing)=> listing._id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          onChange={handleChange}
          defaultValue={currentUser.userName}
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          defaultValue={currentUser.email}
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading" : "update"}
        </button>
      </form>
      <Link
        to={"/create-listing"}
        className="bg-green-600 p-3 text-center text-white rounded-lg mt-2 w-full uppercase flex justify-center"
      >
        Create Listing
      </Link>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleUserDelete}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 cursor-pointer">{error ? error : ""}</p>
      <p className="text-green-700 cursor-pointer">
        {updateSuccess ? "User Updated SuccessFull" : ""}
      </p>

      <button
        onClick={handleShowListings}
        className="w-full text-green-700 font-semibold"
      >
        Show Listings
      </button>
      <p className="text-red-700">{listingError ? listingError : ""}</p>

      <div className="listings max-w-2xl flex flex-col gap-7 mt-7">
        {userListings && userListings.length > 0 ? (
          <h1 className="text-center font-semibold text-2xl">Your Listings</h1>
        ) : null}

        {userListings &&
          userListings.length > 0 &&
          userListings.map((listing) => (
            <div
              className="flex justify-between items-center border-b p-5 gap-4 border-b-slate-400 "
              key={listing._id}
            >
              <img
                src={listing.imageUrls[0]}
                alt="listing cover"
                className="w-16 h-15"
              />
              <Link
                className="font-semibold flex-1 hover:underline truncate"
                to={`/listings/${listing._id}`}
              >
                {listing.name}
              </Link>
              <div className="controls flex flex-col">
                <span onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase cursor-pointer">Delete</span>
                <Link to={`/update-listing/${listing._id}`} className="text-blue-700 uppercase cursor-pointer">Edit</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
