/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { FaArrowUp, FaArrowDown, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import houseData from "../../database/staticDatabase/houseData";
import { useNavigate } from "react-router-dom";

const Houses = () => {
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [rowData, setRowData] = useState(houseData);
  const [statusFilter, setStatusFilter] = useState("");

  const handleViewMore = (house) => {
    navigate(`/house/${house.id}`);
  };

  const handleEdit = (rowIndex) => {
    setEditingRowIndex(rowIndex);
  };

  const handleDelete = (rowIndex) => {
    const updatedData = rowData.filter((_, index) => index !== rowIndex);
    setRowData(updatedData);
  };

  const columns = useMemo(
    () => [
      { Header: "Location", accessor: "location" },
      { Header: "Price", accessor: "price" },
      { Header: "Size (sq ft)", accessor: "size" },
      { Header: "Description", accessor: "description" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <FaEye
              className="text-blue-500 cursor-pointer"
              onClick={() => handleViewMore(row.original)}
            />
            <FaEdit
              className="text-yellow-500 cursor-pointer"
              onClick={() => handleEdit(row.index)}
            />
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(row.index)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (statusFilter) {
      return rowData.filter((house) => house.status === statusFilter);
    }
    return rowData;
  }, [rowData, statusFilter]);

  const data = useMemo(() => filteredData, [filteredData]);
  const navigate = useNavigate();

  const moveColumn = (dragIndex, hoverIndex) => {
    const dragColumn = columns[dragIndex];
    setColumns(
      update(columns, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragColumn],
        ],
      })
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
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
      data,
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

  const handleRowClick = (rowIndex) => {
    setEditingRowIndex(rowIndex);
  };

  const handleInputChange = (rowIndex, columnId, value) => {
    const newData = [...rowData];
    newData[rowIndex][columnId] = value;
    setRowData(newData);
  };

  const DragableHeader = ({ column, index }) => {
    const ref = React.useRef(null);
    const [, drop] = useDrop({
      accept: "column",
      hover(item) {
        if (item.index !== index) {
          moveColumn(item.index, index);
          item.index = index;
        }
      },
    });
    const [{ isDragging }, drag] = useDrag({
      type: "column",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drag(drop(ref));
    return (
      <th
        ref={ref}
        {...column.getHeaderProps(column.getSortByToggleProps())}
        className={`p-2 border border-gray-300 ${
          isDragging ? "opacity-50" : ""
        }`}
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
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 md:p-8 bg-gray-100">
        <div className="max-w-6xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Houses</h2>
          <div className="flex justify-between mb-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="rented">Rented</option>
              <option value="unrented">Unrented</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <table
            {...getTableProps()}
            className="w-full border-collapse border border-gray-200"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-gray-200"
                >
                  {headerGroup.headers.map((column, index) => (
                    <DragableHeader column={column} index={index} key={index} />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="hover:bg-gray-100"
                    onClick={() => handleRowClick(i)}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="p-2 border border-gray-300"
                      >
                        {editingRowIndex === i ? (
                          <input
                            value={cell.value}
                            onChange={(e) =>
                              handleInputChange(
                                i,
                                cell.column.id,
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          cell.render("Cell")
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between items-center py-4">
            <div>
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>
            </div>
            <div>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </div>
            <div>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Houses;
