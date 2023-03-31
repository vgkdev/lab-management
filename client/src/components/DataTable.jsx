import React from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useTable, usePagination, useSortBy } from "react-table";

const DataTable = ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  handleShowModalEdit,
  handleDelete,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    pageCount,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      manualPagination: true,
      //   manualSortBy: true,
      autoResetPage: false,
      //   autoResetSortBy: false,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination
  );

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return (
    <>
      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>ID</th>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
              <th>Quản lý</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td>{i + 1}</td>
                {row.cells.map((cell) => {
                  // console.log("check cell:", cell.column.Header);
                  return (
                    <td
                      className={
                        cell.column.Header === "Trạng thái"
                          ? cell.value === "Đã xử lý"
                            ? "text-success fw-bold"
                            : cell.value === "Đang xử lý"
                            ? "text-warning fw-bold"
                            : "text-danger fw-bold"
                          : ""
                      }
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                {/* {console.log(i)} */}
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleShowModalEdit(row.original)}
                  >
                    <i className="bi bi-pencil-fill text-primary"></i>
                  </Button>{" "}
                  {row.original.chucVu === "Admin" ? (
                    <></>
                  ) : (
                    <Button
                      variant="light"
                      onClick={() => handleDelete(row.original)}
                    >
                      <i className="bi bi-archive-fill"></i>
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
          <tr>
            {loading ? (
              <td className="text-center" colSpan="10000">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                results
              </td>
            )}
          </tr>
        </tbody>
      </Table>
      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
      <div className="pagination row">
        <div className="col-lg-2 col-md-4">
          <Button
            variant="light"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>{" "}
          <Button
            variant="light"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>{" "}
          <Button
            variant="light"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </Button>{" "}
          <Button
            variant="light"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>{" "}
        </div>

        <div className="col-5 col-md-8">
          <span className="m-1">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            className="mx-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default DataTable;
