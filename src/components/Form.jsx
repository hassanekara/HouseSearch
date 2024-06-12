const Form = () => {
  return (
    <div
      className="relative h-[90vh] bg-contain bg-center hidden md:block"
      style={{ backgroundImage: "url('/Images/HomeBg.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full px-64 gap-8 ">
        <div className="flex flex-col justify-center items-center ">
          <h2 className="text-4xl mb-6 text-white ">
            Find the House that suits your
          </h2>
          <h2 className="text-4xl mb-6 text-white ">
            Badgets and your lifestyle
          </h2>
        </div>
        <form className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg justify-center items-center  w-full flex gap-6">
          <div className="mb-4 w-[500px]">
            <label htmlFor="location" className="block text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter location"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="checkin" className="block text-gray-700">
              Check-in Date
            </label>
            <input
              type="date"
              id="checkin"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="checkout" className="block text-gray-700">
              Check-out Date
            </label>
            <input
              type="date"
              id="checkout"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 w-72">
            <label htmlFor="guests" className="block text-gray-700">
              Guests
            </label>
            <select
              id="guests"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6 Guests</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-64 h-12 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
