const AboutSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center py-8 bg-white">
      <div className="w-full md:w-1/2 px-4">
        <img
          src="/Images/AboutImage.png"
          alt="Project"
          className="w-full h-auto rounded-lg "
        />
      </div>
      <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
        <h2 className="text-3xl mb-4 text-gray-800">About Our Project</h2>
        <p className="text-gray-600 mb-4">
          At Rent-kg, we understand that finding the perfect home can be a
          daunting task. That’s why we’re here to help. Our team of experts is
          committed to providing you with a seamless and stress-free experience.
          We pride ourselves on our exceptional customer service and our
          extensive selection of house. Let us help you find house that suite
          your budget today. Read more....
        </p>
        <p className="text-gray-600 mb-4">
          Our platform is user-friendly and features a wide range of properties.
          You can browse through our listings, view detailed information about
          each property, and contact the owner directly through our app. We are
          committed to making your house-hunting experience smooth and
          hassle-free.
        </p>
        <p className="text-gray-600">
          Join us today and find your dream home with Us! NHK
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
