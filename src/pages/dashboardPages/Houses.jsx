/* eslint-disable react/prop-types */

import { useMemo } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';
import houseData from '../../database/staticDatabase/houseData';
// import { FixedSizeList } from 'react-window';
// import './Houses.css';  // Assuming you have a CSS file for additional styling

// Define a default filter UI for columns
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      className="p-2 border rounded"
    />
  );
};

const Houses = () => {
  const data = useMemo(() => houseData, []);

  const columns = useMemo(() => [
    {
      Header: 'Location',
      accessor: 'location',
      Filter: DefaultColumnFilter,
    },
    {
      Header: 'Price',
      accessor: 'price',
      Filter: DefaultColumnFilter,
    },
    {
      Header: 'Size (sqft)',
      accessor: 'size',
      Filter: DefaultColumnFilter,
    },
    {
      Header: 'Description',
      accessor: 'description',
      Filter: DefaultColumnFilter,
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: ({ cell: { value } }) => (
        <img src={value} alt="house" className="w-24 h-24 object-cover" />
      ),
      disableFilters: true,
    },
    {
      Header: 'Link',
      accessor: 'link',
      Cell: ({ cell: { value } }) => (
        <a href={value} className="text-blue-500 hover:underline">View House</a>
      ),
      disableFilters: true,
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our initial table state
    },
    useFilters, // Use the useFilters plugin hook
    useSortBy, // Use the useSortBy plugin hook
    usePagination // Use the usePagination plugin hook
  );

  return (
    <div className="p-4">
      <table {...getTableProps()} className="min-w-full table-auto border-collapse border border-gray-300 houses-table">
        <thead className="bg-gray-200">
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border border-gray-300 px-4 py-2 text-left text-gray-700"
                  key={j}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {row.cells.map((cell, j) => (
                  <td
                    {...cell.getCellProps()}
                    className="border border-gray-300 px-4 py-2 text-gray-700"
                    key={j}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="pagination p-4 flex justify-between items-center">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="px-4 py-2 border rounded bg-gray-200">
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-4 py-2 border rounded bg-gray-200">
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage} className="px-4 py-2 border rounded bg-gray-200">
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="px-4 py-2 border rounded bg-gray-200">
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="border rounded p-2"
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
          className="border rounded p-2"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Houses;

