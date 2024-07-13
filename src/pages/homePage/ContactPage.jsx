import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT_US_CONTENT, GET_CONTACT_US_CONTENTS } from "../../database/queries/ContactUsQueries";
const ContactPage = () => {
const [fullName,setFullName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [addContactUsContent] = useMutation(ADD_CONTACT_US_CONTENT,{
  refetchQueries:[{query:GET_CONTACT_US_CONTENTS}]
})
const handleSubmit =(e)=>{
  e.preventDefault();
 addContactUsContent({variables:{fullName,email,message}})
}

  return (
    <div className="flex flex-col md:flex-row items-center py-8 bg-gray-100">
      <div className="w-full md:w-1/2 px-4">
        <h2 className="text-3xl mb-4 text-gray-800">Contact Us</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
        <h2 className="text-3xl mb-4 text-gray-800">Get in Touch</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions, feel free to reach out to us through the
          form or contact us directly via phone or email.
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Phone:</strong> +123 456 7890
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Email:</strong> support@timtomaviation.com
        </p>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
