const ContactPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center py-8 bg-gray-100">
      <div className="w-full md:w-1/2 px-4">
        <h2 className="text-3xl mb-4 text-gray-800">Contact Us</h2>
        <form className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
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
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">
              Message
            </label>
            <textarea
              id="message"
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
          <strong>Phone:</strong> +250 791 431 668
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Email:</strong> nhassanekara@gmail.com
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
            className="text-blue-700 hover:underline"
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
