'use client';
import { useState } from "react";

export default function Home() {
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');
const [successMessage, setSuccessMessage] = useState(null)
const [formSubmitted, setFormSubmitted] = useState(false);
const [showSuccess, setShowSuccess] = useState(false)

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a=zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/i;
  return emailRegex.test(email.toLowerCase());
};

const handleSubmit = (e) => {
  e.preventDefault();
  setFormSubmitted(true);
  console.log('Email:', email);
  console.log('Is valid email:', isValidEmail(email));
if (!isValidEmail(email)) {
  setEmailError('Valid email required');
} else {
  console.log('Valid email, setting success message');
  setEmailError(null);
  setSuccessMessage(`A confirmation has been sent to ${email}. Please open it and click the button inside to confirm your subscription`);
  setShowSuccess(true);
  setEmail('');
}
};
  return (
    <div id="main-container" className="max-h-screen md:min-h-screen md:flex md:justify-center md:items-center   md:p-8 lg:p-10 xl:p-12  bg-gray-900 p-4">
      {showSuccess && (
        <div id="success-container" className={showSuccess ? 'md:flex md:justify-center md:items-center md:h-screen md:w-full md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white p-4 rounded-xl' : 'hidden'}>
        <img src="/images/icon-success.svg" alt="success icon"/>
        <h1 className="text-lg font-bold">Thanks for subscribing!</h1>
        <p className="text-sm">{successMessage}</p>
        <div className="pt-6">
        <button id="dismiss button" className="bg-gray-900 hover:bg-red-400 text-white font-bold py-2 px-4 rounded" onClick={() => {
          setSuccessMessage(null);
          setFormSubmitted(false);
          setShowSuccess(false);
        }}>Dismiss message</button>
        </div>
        </div>
      )}
    
    {!successMessage && (
         <div id="form-container" className="w-full md:flex md:justify-between md:items-center md:w-1/2
         px-4 bg-white rounded-lg ">
          <img src="/images/illustration-sign-up-desktop.svg" alt="desktop illustration" className="w-full object-cover md:w-60 hidden md:block md:order-2"/>
          <img src="/images/illustration-sign-up-mobile.svg" alt="Mobile illustration" id="mobile-image" className="w-full md:hidden"/>
          <div className=" p-2 flex flex-col justify-center md:order-1">
          <h1 id="move" className="text-lg font-bold text-gray-900">Stay updated!</h1>
          <p id="move" className="text-sm text-gray-900 py-3">Join 60,000+ product managers receiving monthly updates on:</p>
          <ul id="move" className="list-none text-gray-900 text-sm py-2">
           <li className="flex gap-2 py-2"><img src="/images/icon-list.svg"/>Measuring to ensure updates are a success</li>
           <li className="flex gap-2 py-2"><img src="/images/icon-list.svg"/>Product discovery and building what matters</li>
           <li className="flex gap-2 py-2"><img src="/images/icon-list.svg"/>And much more!</li>
          </ul>
     
          <form onSubmit={handleSubmit} className="flex text-gray-900 flex-col py-4">
            <div className="flex justify-between">
            <label htmlFor="email" className="text-sm">Email address</label>
           {formSubmitted && emailError !== null && (
             <p id="email-error" className="text-red-500">{emailError}</p>
           )}
            </div>
           
           <input type="email" id="email" placeholder="email@company.com" className={`p-2 border ${
              emailError && !email ? 'border-red-300 bg-red-100 placeholder:text-red-500' : 'border-gray-300 bg-white placeholder:text-gray-400'
           } border-gray-300 hover:border-gray-700 rounded"`} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div className="py-4">
            <button type="submit" className="bg-gray-900 hover:bg-red-400 text-white text-sm py-2 px-8 rounded">Subscribe to monthly newsletter</button>
            </div>
          </form>
          </div>
         </div> 
    )}
    </div>
  );
}
