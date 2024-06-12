import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-cover bg-center bg-slate-600 py-8"
      style={{ backgroundImage: "url(/footer-bg.jpg)" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src="/Images/MyLogo.png"
            alt="House Search"
            className="h-12 w-12 mr-3"
          />
          <span className="text-xl font-bold">House Search</span>
        </div>
        <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
          <a href="/" className="text-white hover:underline px-3">
            Home
          </a>
          <a href="/about" className="text-white hover:underline px-3">
            About
          </a>
          <a href="/services" className="text-white hover:underline px-3">
            Services
          </a>
          <a href="/contact" className="text-white hover:underline px-3">
            Contact
          </a>
          <a href="/privacy" className="text-white hover:underline px-3">
            Privacy Policy
          </a>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; {currentYear} House Search. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
