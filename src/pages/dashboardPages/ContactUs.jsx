import { useQuery } from "@apollo/client";

import { GET_CONTACT_US_CONTENTS } from "../../database/queries/ContactUsQueries";

function ContactUs() {
  const { loading, error, data } = useQuery(GET_CONTACT_US_CONTENTS);

  if (loading) {
    return <p>Data is Loading.....</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <h1>Wellcome to the contact us page</h1>
      <div>
        <ul>
          {data.getContactUsContents.map((contact) => (
            <li key={contact.id} className="my-8 p-8 bg-slate-500 text-white">
              <p>FullName : {contact.fullName}</p>
              <p>Email : {contact.email}</p>
              <p>Message : {contact.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactUs;

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/jsx-key */
// /* eslint-disable react/prop-types */
// import React, { useMemo, useState } from "react";
// import {
//   useTable,
//   usePagination,
//   useSortBy,
//   useFilters,
//   useGlobalFilter,
//   useRowSelect,
// } from "react-table";
// import { FaArrowUp, FaArrowDown, FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import update from "immutability-helper";
// import houseData from "../../database/staticDatabase/houseData";
// import { Link, useNavigate } from "react-router-dom";
// import Button1 from "../../components/Button1";

// const ContactUs = () => {
//   const [rowData, setRowData] = useState(houseData);
//   const [locationFilter, setLocationFilter] = useState("");
//   const navigate = useNavigate();

//   const handleViewMore = (houseId) => {
//     navigate(`/admin/view-house/${houseId}`);
//   };

//   const handleEdit = (houseId) => {
//     navigate(`/admin/edit-house/${houseId}`);
//   };

//   const handleDelete = (rowIndex) => {
//     const updatedData = rowData.filter((_, index) => index !== rowIndex);
//     setRowData(updatedData);
//   };

//   const columns = useMemo(
//     () => [
//       { Header: "Location", accessor: "location" },
//       { Header: "Price", accessor: "price" },
//       { Header: "Size (sq ft)", accessor: "size" },
//       { Header: "Bed Rooms", accessor: "numberOfBeds" },
//       { Header: "Status", accessor: "status" },
//       {
//         Header: "Actions",
//         accessor: "actions",
//         Cell: ({ row }) => (
//           <div className="flex space-x-2">
//             <FaEye
//               className="text-blue-500 cursor-pointer"
//               onClick={() => handleViewMore(row.original.id)}
//             />
//             <FaTrash
//               className="text-red-500 cursor-pointer"
//               onClick={() => handleDelete(row.index)}
//             />
//           </div>
//         ),
//       },
//     ],
//     []
//   );
//   const filteredPendingDdata = rowData.filter((pendingHouse)=> pendingHouse.status === "rented");
//   // console.log("This is pending data", filteredPendingDdata);

//     const filteredData = useMemo(() => {
//     if (locationFilter) {
//       return filteredPendingDdata.filter((house) => house.location === locationFilter);
//     }
//     return filteredPendingDdata;
//   }, [rowData, locationFilter]);

//   const data = useMemo(() => filteredData, [filteredData]);

//   const moveColumn = (dragIndex, hoverIndex) => {
//     const dragColumn = columns[dragIndex];
//     setColumns(
//       update(columns, {
//         $splice: [
//           [dragIndex, 1],
//           [hoverIndex, 0, dragColumn],
//         ],
//       })
//     );
//   };

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     setGlobalFilter,
//     state: { pageIndex, pageSize, globalFilter },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0, pageSize: 10 },
//     },
//     useFilters,
//     useGlobalFilter,
//     useSortBy,
//     usePagination,
//     useRowSelect,
//     (hooks) => {
//       hooks.visibleColumns.push((columns) => [
//         {
//           id: "selection",
//           Header: ({ getToggleAllRowsSelectedProps }) => (
//             <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
//           ),
//           Cell: ({ row }) => (
//             <input type="checkbox" {...row.getToggleRowSelectedProps()} />
//           ),
//         },
//         ...columns,
//       ]);
//     }
//   );

//   const DragableHeader = ({ column, index }) => {
//     const ref = React.useRef(null);
//     const [, drop] = useDrop({
//       accept: "column",
//       hover(item) {
//         if (item.index !== index) {
//           moveColumn(item.index, index);
//           item.index = index;
//         }
//       },
//     });
//     const [{ isDragging }, drag] = useDrag({
//       type: "column",
//       item: { index },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     });
//     drag(drop(ref));
//     return (
//       <th
//         ref={ref}
//         {...column.getHeaderProps(column.getSortByToggleProps())}
//         className={`p-2 border border-gray-300 ${
//           isDragging ? "opacity-50" : ""
//         }`}
//       >
//         {column.render("Header")}
//         <span>
//           {column.isSorted ? (
//             column.isSortedDesc ? (
//               <FaArrowDown className="inline ml-2" />
//             ) : (
//               <FaArrowUp className="inline ml-2" />
//             )
//           ) : (
//             ""
//           )}
//         </span>
//       </th>
//     );
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="p-4 md:p-8 bg-gray-100">
//         <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold mb-4">ContactUs</h2>
//             <Link to={"/admin/add-new-house"}>
//               <Button1 title={"Add New House"} icon={"+"} />
//             </Link>
//           </div>
//           <div className="flex justify-between mb-4">
//             <select
//               value={locationFilter}
//               onChange={(e) => setLocationFilter(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">All</option>
//               <option value="Kicukiro">Kicukiro</option>
//               <option value="Nyarugenge">Nyarugenge</option>
//               <option value="Gasabo">Gasabo</option>
//             </select>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="p-2 border border-gray-300 rounded-md"
//             >
//               {[5,10, 20, 30, 40, 50].map((pageSize) => (
//                 <option key={pageSize} value={pageSize}>
//                   Show {pageSize}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <table
//             {...getTableProps()}
//             className="w-full border-collapse border border-gray-200"
//           >
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr
//                   {...headerGroup.getHeaderGroupProps()}
//                   className="bg-gray-200"
//                 >
//                   {headerGroup.headers.map((column, index) => (
//                     <DragableHeader column={column} index={index} key={index} />
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {page.map((row, i) => {
//                 prepareRow(row);
//                 return (
//                   <tr
//                     {...row.getRowProps()}
//                     className="hover:bg-gray-100"
//                   >
//                     {row.cells.map((cell) => (
//                       <td
//                         {...cell.getCellProps()}
//                         className="p-2 border border-gray-300"
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <div className="flex justify-between mt-4">
//             <div>
//               Page{" "}
//               <strong>
//                 {pageIndex + 1} of {pageOptions.length}
//               </strong>
//             </div>
//             <div>
//               <button
//                 onClick={() => previousPage()}
//                 disabled={!canPreviousPage}
//                 className="p-2 border border-gray-300 rounded-md"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() => nextPage()}
//                 disabled={!canNextPage}
//                 className="p-2 border border-gray-300 rounded-md"
//               >
//                 Next
//               </button>
//             </div>
//             <div>
//               Showing {page.length} of {rows.length} results
//             </div>
//           </div>
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default ContactUs;
