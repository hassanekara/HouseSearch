const Form = () => {
  return (
    <div className="relative h-screen bg-cover bg-center"  style={{ backgroundImage: "url('/Images/HomeBg.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <form className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl mb-6 text-gray-800">Find Your Perfect Rental</h2>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <input type="text" id="location" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" placeholder="Enter location" />
          </div>
          <div className="mb-4">
            <label htmlFor="checkin" className="block text-gray-700">Check-in Date</label>
            <input type="date" id="checkin" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="checkout" className="block text-gray-700">Check-out Date</label>
            <input type="date" id="checkout" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="guests" className="block text-gray-700">Guests</label>
            <select id="guests" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6 Guests</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none">Search</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
