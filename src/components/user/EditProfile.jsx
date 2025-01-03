import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar.jsx';
import PlaceHolder from '/images/Default-Image.png';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hiddenInput = useRef(null);
  const [ProfilePic, setProfilePic] = useState(PlaceHolder); // Default placeholder image
  const { username, isLoggedIn, email } = useSelector((state) => state.user);
  const [Username, setUsername] = useState(username);
  const [warning, setWarning] = useState(true);  // Renamed warining to warning
  const [forceChange, setforceChange] = useState(false);
  const [name, setname] = useState("~ No Name ");
  const [bio, setbio] = useState("~ No Bio ");

  const fetchUser = async (username) => {
    try {
      const req = await fetch(`http://localhost:3000/profile?username=${username}`, { method: "GET" });
      const res = await req.json();
      if (res.success) {
        setbio(res.user.bio);
        setname(res.user.name);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  useEffect(() => {
    setUsername(username);
    fetchUser(username);
  }, [username]);

  const onSubmit = async (data) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Set submission state

    try {
      toast.info('Updating User Profile...', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: {
          backgroundColor: '#ddd6fe',  // Custom background color
          color: '#000000',
        },
      });

      //await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay
      const response = await fetch("http://localhost:3000/profile/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      // console.log(result);
      toast.success('Profile Updated!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: {
          backgroundColor: '#ddd6fe',  // Custom background color
          color: '#000000',
        },
      });
    } catch (error) {
      toast.error('Error during Updating User Profile..', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: {
          backgroundColor: '#ddd6fe',  // Custom background color
          color: '#000000',
        },
      });
      console.error('Error during form submission:', error);
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  const AddProfilePic = () => {
    const hiddenInput = document.getElementById("profilePic");
    hiddenInput.click();  // Trigger file input click
  };

  const handleChange = (e) => {setUsername(e.target.value);};
  const handleChangeName = (e) => {setname(e.target.value);};
  const handleChangeBio = (e) => {setbio(e.target.value);};

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileUrl = URL.createObjectURL(file);
      setProfilePic(fileUrl);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const ToggleWarning = () => {
    setWarning(!warning);  // Toggling warning visibility
  };

  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div className="container mx-auto my-10 w-[85%] lg:w-3/4 h-3/4 bg-purple-100 rounded-lg text-center">
        <h1 className="text-white text-xl px-6 p-3 font-bold bg-purple-900 rounded-lg mb-5">
          Edit Profile
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 lg:flex-row items-center justify-evenly h-full"
        >
          {/* Left Column */}
          <div className="left w-[85%] lg:mx-0 lg:w-1/2 flex flex-col gap-7">
            {/* Username */}
            <div className="form-group flex items-center justify-between gap-2">
              <label className="form-label font-sans font-medium">Username</label>
              <input
                disabled={!warning && forceChange}
                {...register('username')}
                type="text"
                onChange={handleChange}
                value={Username}
                className="form-control focus:outline-purple-400 w-3/4 outline-none h-[35px] rounded-lg px-4"
                placeholder="Username"
              />
            </div>
            {warning && (
              <div className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-300" role="alert">
                <div className="flex items-center">
                  <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <h3 className="text-lg font-medium">Before you change your username!</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                  It is not recommended to frequently change user as it can cause serious data duplication and adversely affect your profile.
                </div>
                <div className="flex">
                  <button onClick={ToggleWarning} type="button" className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Force Change
                  </button>
                  <button onClick={() => { ToggleWarning(); setforceChange(true); }} type="button" className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800">
                    Got it
                  </button>
                </div>
              </div>
            )}
            {/* Name */}
            <div className="form-group flex items-center justify-between gap-2">
              <label className="form-label font-sans font-medium">Name</label>
              <input
                {...register('name')}
                type="text"
                onChange={handleChangeName }
                value={name}
                className="focus:outline-purple-400 form-control w-3/4 outline-none h-[35px] rounded-lg px-4"
                placeholder="Name"
              />
            </div>
            {/* Bio */}
            <div className="form-group flex justify-between gap-2">
              <label className="form-label font-sans font-medium">Bio</label>
              <textarea
                {...register('bio')}
                onChange={handleChangeBio}
                value={bio}
                className="form-control focus:outline-purple-400 w-3/4 outline-none h-[100px] rounded-lg px-4 py-2 resize-none"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
          </div>

          <div className="right flex-[0.5] flex flex-col items-end">
            <div className="pp flex flex-col gap-3 justify-center">
              <img
                src={ProfilePic}
                alt="Profile Pic"
                className="rounded-lg"
                height={200}
                width={200}
              />
              <input
                ref={hiddenInput}
                id="profilePic"
                onChange={handleFile}
                {...register('profilePicture')}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={AddProfilePic}
                className="bg-purple-900 text-white px-4 py-2 rounded-lg font-bold transition-transform duration-300 hover:scale-105"
              >
                Add Profile Picture
              </button>
            </div>
          </div>
        </form>
        <div className="my-5 w-full">
          <button
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className={`bg-purple-900 text-white py-2 px-4 font-bold rounded-lg transition-transform duration-300 hover:scale-105 w-[80%] -mb-10 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="button"
          >
            {isSubmitting ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
