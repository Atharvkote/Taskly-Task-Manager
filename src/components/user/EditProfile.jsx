import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../Navbar.jsx';
import PlaceHolder from '/images/Default-Image.png';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Set submission state

    try {
      // Simulate form submission logic (e.g., API call)
      console.log('Form Data:', data);
      toast.info('Updating User Profile..', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Bounce,
        style: {
          backgroundColor: '#ddd6fe',  // Custom background color
          color: '#000000', 
        },
        });
      // You can add actual API request logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay
      toast.success('Profile Updated!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Bounce,
        style: {
          backgroundColor: '#ddd6fe',  // Custom background color
          color: '#000000', 
        },
        });
    } catch (error) {
      toast.error('Error during Updating User Profile..', {
        position: "top-right",
        autoClose: onSubmit,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Bounce,
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
        transition={"Bounce"}
      />
      <div className="container mx-auto my-10 w-3/4 h-3/4 bg-purple-100 rounded-lg text-center">
        <h1 className="text-white text-xl px-6 p-3 font-bold bg-purple-900 rounded-lg mb-5">
          Edit Profile
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-evenly h-full"
        >
          <div className="left w-1/2 flex flex-col gap-7">
            <div className="form-group flex items-center justify-between gap-2">
              <label className="form-label font-sans font-medium">Username</label>
              <input
                {...register('username')}
                type="text"
                className="form-control focus:outline-purple-400 w-3/4 outline-none h-[35px] rounded-lg px-4"
                placeholder="Username"
              />
            </div>
            <div className="form-group flex items-center justify-between gap-2">
              <label className="form-label font-sans font-medium">Name</label>
              <input
                {...register('name')}
                type="text"
                className="focus:outline-purple-400 form-control w-3/4 outline-none h-[35px] rounded-lg px-4"
                placeholder="Name"
              />
            </div>
            <div className="form-group w-full flex items-center justify-between gap-2">
              <label className="form-label font-sans font-medium">About me</label>
              <input
                {...register('aboutMe')}
                type="text"
                className="focus:outline-purple-400 form-control w-3/4 outline-none h-[35px] rounded-lg px-4"
                placeholder="About me"
              />
            </div>
            <div className="form-label font-sans bg-purple-900 text-white py-2 rounded-xl font-bold">
              Set Working Hours
            </div>
            <div className="time flex w-full">
              <div className="form-group w-full flex justify-between items-center gap-2">
                <label className="form-label font-sans flex-1 font-medium">Starting Time</label>
                <input
                  {...register('startTime')}
                  type="time"
                  className="form-control focus:outline-purple-400 flex-1 w-3/4 outline-none h-[35px] rounded-lg px-4"
                />
              </div>
              <div className="form-group w-full flex justify-between items-center gap-2">
                <label className="form-label font-sans flex-1 font-medium">End Time</label>
                <input
                  {...register('endTime')}
                  type="time"
                  className="focus:outline-purple-400 form-control flex-1 w-3/4 outline-none h-[35px] rounded-lg px-4"
                />
              </div>
            </div>
            <div className="form-group w-full flex justify-between items-center gap-2">
              <label className="form-label font-sans font-medium">Weekend</label>
              <input
                {...register('weekend')}
                type="text"
                className="focus:outline-purple-400 form-control w-3/4 outline-none h-[35px] rounded-lg px-4"
                placeholder="Weekend"
              />
            </div>
            <div className="form-group w-full flex justify-between items-center gap-2">
              <label className="form-label font-sans font-medium">Occupation</label>
              <select
                {...register('occupation')}
                className="w-1/2 px-3 h-[35px] rounded-lg outline-none"
              >
                <option value="">Select Occupation</option>
                <option value="Business">Business</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>
          <div className="right flex-[0.5] flex flex-col items-end">
            <div className="pp flex flex-col gap-3 justify-center">
              <img
                src={PlaceHolder}
                alt="Default-Image.png"
                className="rounded-lg"
                height={200}
                width={200}
              />
              <input
                {...register('profilePicture')}
                type="file"
                className="hidden"
              />
              <button
                type="button"
                className="bg-purple-900 text-white py-2 px-4 font-bold rounded-lg transition-transform duration-300 hover:scale-105"
              >
                Add Profile Picture
              </button>
            </div>
            <div className="form-group my-5 py-5 flex items-center">
              <label className="form-label flex-1 font-sans font-medium">
                Birth date (Optional)
              </label>
              <input
                {...register('birthDate')}
                type="date"
                className="form-control w-full outline-none h-[35px] rounded-lg px-4 flex-1"
              />
            </div>
          </div>
        </form>
        <div className="my-5 w-full">
          <button
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className={`bg-purple-900 text-white py-2 px-4 font-bold rounded-lg transition-transform duration-300 hover:scale-105 w-1/2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="button"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
