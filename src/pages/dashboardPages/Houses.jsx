// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// /* eslint-disable react/jsx-key */
import { useQuery, useMutation} from '@apollo/client';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Button1 from "../../components/Button1";
import { DELETE_MYHOUSE_DATA, GET_MYHOUSE_DATAS } from '../../database/queries/MyHouseQueries';

const HouseTable = () => {
  const { loading, error, data } = useQuery(GET_MYHOUSE_DATAS);
  const [deleteMyHouse] = useMutation(DELETE_MYHOUSE_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading houses</p>;

  const handleDelete = async (deleteMyHouseId) => {
    try {
      await deleteMyHouse({ variables: { deleteMyHouseId }, refetchQueries: [{ query: GET_MYHOUSE_DATAS }] });
      console.log(`House with deleteMyHouseId ${deleteMyHouseId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  };

  const handleUpdate = (id) => {
    // Handle the update logic here
    console.log(`Update house with id ${id}`);
  };

  const handleViewMore = (id) => {
    // Handle the view more logic here
    console.log(`View more details for house with id ${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
           <h2 className="text-2xl font-bold mb-4">Houses</h2>
           <Link to="/admin/add-new-house">
             <Button1 title="Add New House" icon="+" />
           </Link>
         </div>
    
    <table>
      <thead>
        <tr>
          <th>HouseID</th>
          <th>Owner</th>
          <th>Location</th>
          <th>Price</th>
          <th>Size</th>
          <th>Number Of Beds</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.getMyHouses.map((house) => (
          <tr key={house._id}>
            <td>{house._id}</td>
            <td>{house.user_id.map((user)=>(
              <div key={user._id}> {user._id} </div>
            ))}</td>
            <td>{house.location}</td>
            <td>{house.price}</td>
            <td>{house.size}</td>
            <td>{house.numberOfBeds}</td>
            <td className='flex gap-4'>
              <FaEdit onClick={() => handleUpdate(house._id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
              <FaTrash onClick={() => handleDelete(house._id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
              <FaEye onClick={() => handleViewMore(house._id)} style={{ cursor: 'pointer' }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default HouseTable;
