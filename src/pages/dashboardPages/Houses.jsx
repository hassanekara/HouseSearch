/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { FaArrowUp, FaArrowDown, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_HOUSES, DELETE_HOUSE_MUTATION } from "../../database/queries/HouseQueries";
import Button1 from "../../components/Button1";

const Houses = () => {
  const { loading, error, data } = useQuery(GET_ALL_HOUSES);
  const [deleteHouse] = useMutation(DELETE_HOUSE_MUTATION, {
    refetchQueries: [{ query: GET_ALL_HOUSES }],
  });

  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Location", accessor: "location" },
      { Header: "Price", accessor: "price" },
      { Header: "Size (sq ft)", accessor: "size" },
      { Header: "Bed Rooms", accessor: "numberOfBeds" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <FaEye
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate(`/admin/view-house/${row.original.id}`)}
            />
            <FaEdit
              className="text-yellow-500 cursor-pointer"
              onClick={() => navigate(`/admin/edit-house/${row.original.id}`)}
            />
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={() => deleteHouse({ variables: { deleteHouseId: row.original.id } })}
            />
          </div>
        ),
      },
    ],
    [deleteHouse, navigate]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data: data ? data.getHouses : [],
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 md:p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Houses</h2>
          <Link to="/admin/add-new-house">
            <Button1 title="Add New House" icon="+" />
          </Link>
        </div>
        <table {...getTableProps()} className="w-full border-collapse border border-gray-200">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-2 border border-gray-300"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaArrowDown className="inline ml-2" />
                        ) : (
                          <FaArrowUp className="inline ml-2" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-2 border border-gray-300">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <div>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
          <div>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="p-2 border border-gray-300 rounded-md"
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="p-2 border border-gray-300 rounded-md"
            >
              Next
            </button>
          </div>
          <div>
            Showing {page.length} of {data.getHouses.length} results
          </div>
        </div>
      </div>
    </div>
  );
};

export default Houses;
// import { useQuery } from "@apollo/client"
// import { GET_ALL_HOUSES } from "../../database/queries/HouseQueries"
// import { useNavigate } from "react-router-dom";

// function Houses() {
//   const {loading, error, data} = useQuery(GET_ALL_HOUSES);
// const navigate =  useNavigate();

//   if(loading){
//     return <p>Data is Loading ....</p>;
//   }
//   if(error){
//     return <p>Error:{error.message}</p>
//   }

//   return (
//     <div>
//       <h1>This is House Content</h1>
//       <div>
//         <ul>
//           {data.getHouses.map((house)=>(
//             <li key={house.id} className="py-8" >
//               <p>House Id:{house.id}</p>
//               <p>Location:{house.location}</p>
//               <p>House Size:{house.size}</p>
//               <p>House Price:{house.price}</p>
//               <button onClick={() => navigate(`/admin/view-house/${house.id}`)}>View More</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Houses
