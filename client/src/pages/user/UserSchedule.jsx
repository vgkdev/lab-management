import React, { useEffect, useState, useMemo } from "react";
import { Button, Modal, Form, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllSchedule } from "../../api/scheduleAPI";

import DataTable from "../../components/DataTable";
import { getAllYear } from "../../api/yearAPI";
import { getAllSemester } from "../../api/semesterAPI";

const Schedule = (props) => {
  const [show, setShow] = useState(false);
  const [namHoc, setNamHoc] = useState("");
  const [hocKy, setHocKy] = useState("");
  const [listSchedule, setListSchedule] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  // const [formEidt, setFormEidt] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  // const exampleData = [
  //   {
  //     buoi: "Sáng",
  //     phongTH: "PH01",
  //     thu2: { tenHP: "LTHDT", idNhom: "LTHDT-01" },
  //     thu3: null,
  //     thu4: { tenHP: "OOP", idNhom: "OOP-02" },
  //     thu5: null,
  //     thu6: { tenHP: "AI", idNhom: "AI-01" },
  //     thu7: null,
  //     cn: { tenHP: "ML", idNhom: "ML-03" },
  //   },
  //   {
  //     buoi: "Sáng",
  //     phongTH: "PH02",
  //     thu2: null,
  //     thu3: { tenHP: "LTHDT", idNhom: "LTHDT-02" },
  //     thu4: null,
  //     thu5: { tenHP: "OOP", idNhom: "OOP-03" },
  //     thu6: null,
  //     thu7: { tenHP: "AI", idNhom: "AI-02" },
  //     cn: null,
  //   },
  //   {
  //     buoi: "Chiều",
  //     phongTH: "PH03",
  //     thu2: { tenHP: "ML", idNhom: "ML-01" },
  //     thu3: null,
  //     thu4: { tenHP: "OOP", idNhom: "OOP-01" },
  //     thu5: null,
  //     thu6: { tenHP: "AI", idNhom: "AI-03" },
  //     thu7: null,
  //     cn: { tenHP: "LTHDT", idNhom: "LTHDT-03" },
  //   },
  // ];

  const columns = useMemo(
    () => [
      {
        Header: "Buổi",
        accessor: "buoi",
      },
      {
        Header: "Phòng TH",
        accessor: "phongTH",
      },
      {
        Header: "Thứ 2",
        accessor: "thu2",
        Cell: ({ value }) => {
          return value ? (
            <div className="text-center">
              <p className="fw-semibold">Mã HP: {value.maHP}</p>
              <p className="fw-semibold">Nhóm: {value.idNhom}</p>
              <p className="fw-semibold">Cán bộ: {value.maCB}</p>
              <p className="fw-semibold">
                Tiết: {value.tietBD} - {value.tietBD + value.soTiet}
              </p>
            </div>
          ) : null;
        },
      },
      {
        Header: "Thứ 3",
        accessor: "thu3",
        Cell: ({ value }) => {
          return value ? (
            <div className="text-center">
              <p className="fw-semibold">Mã HP: {value.maHP}</p>
              <p className="fw-semibold">Nhóm: {value.idNhom}</p>
              <p className="fw-semibold">Cán bộ: {value.maCB}</p>
              <p className="fw-semibold">
                Tiết: {value.tietBD} - {value.tietBD + value.soTiet}
              </p>
            </div>
          ) : null;
        },
      },
      {
        Header: "Thứ 4",
        accessor: "thu4",
        Cell: ({ value }) => {
          return value ? (
            <div className="text-center">
              <p className="fw-semibold">Mã HP: {value.maHP}</p>
              <p className="fw-semibold">Nhóm: {value.idNhom}</p>
              <p className="fw-semibold">Cán bộ: {value.maCB}</p>
              <p className="fw-semibold">
                Tiết: {value.tietBD} - {value.tietBD + value.soTiet}
              </p>
            </div>
          ) : null;
        },
      },
      {
        Header: "Thứ 5",
        accessor: "thu5",
        Cell: ({ value }) => {
          return value ? (
            <div className="text-center">
              <p className="fw-semibold">Mã HP: {value.maHP}</p>
              <p className="fw-semibold">Nhóm: {value.idNhom}</p>
              <p className="fw-semibold">Cán bộ: {value.maCB}</p>
              <p className="fw-semibold">
                Tiết: {value.tietBD} - {value.tietBD + value.soTiet}
              </p>
            </div>
          ) : null;
        },
      },
      {
        Header: "Thứ 6",
        accessor: "thu6",
        Cell: ({ value }) => {
          return value ? (
            <div className="text-center">
              <p className="fw-semibold">Mã HP: {value.maHP}</p>
              <p className="fw-semibold">Nhóm: {value.idNhom}</p>
              <p className="fw-semibold">Cán bộ: {value.maCB}</p>
              <p className="fw-semibold">
                Tiết: {value.tietBD} - {value.tietBD + value.soTiet}
              </p>
            </div>
          ) : null;
        },
      },
      {
        Header: "Thứ 7",
        accessor: "thu7",
        Cell: ({ value }) => {
          return value ? (
            <div className="text-center">
              <p className="fw-semibold">Mã HP: {value.maHP}</p>
              <p className="fw-semibold">Nhóm: {value.idNhom}</p>
              <p className="fw-semibold">Cán bộ: {value.maCB}</p>
              <p className="fw-semibold">
                Tiết: {value.tietBD} - {value.tietBD + value.soTiet}
              </p>
            </div>
          ) : null;
        },
      },
      {
        Header: "Chủ nhật",
        accessor: "cn",
        Cell: ({ value }) => {
          return value ? (
            <div className="text-center">
              <p className="fw-semibold">Mã HP: {value.maHP}</p>
              <p className="fw-semibold">Nhóm: {value.idNhom}</p>
              <p className="fw-semibold">Cán bộ: {value.maCB}</p>
              <p className="fw-semibold">
                Tiết: {value.tietBD} - {value.tietBD + value.soTiet}
              </p>
            </div>
          ) : null;
        },
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.listYear.length !== 0) {
          console.log("check list year props redux", props.listYear);
          setLoadingData(false);
        } else {
          const listYear = await getAllYear();

          if (listYear.data.errCode !== 0) {
            console.log("year not found");
            setLoadingData(false);
          } else {
            props.setListYear(listYear.data.year);
            setLoadingData(false);
            console.log("check list year: ", listYear.data.year);
          }
        }

        //---------semester-------------------
        if (props.listSemester.length !== 0) {
          console.log("check list semester props redux", props.listSemester);
          setLoadingData(false);
        } else {
          const listSemester = await getAllSemester();

          if (listSemester.data.errCode !== 0) {
            console.log("semester not found");
            setLoadingData(false);
          } else {
            props.setListSemester(listSemester.data.semester);
            setLoadingData(false);
            console.log("check list semester: ", listSemester.data.semester);
          }
        }
      } catch (e) {
        console.log("error get all schedule: ", e);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [props]);

  const fetchDataTable = React.useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      setLoading(true);

      setTimeout(() => {
        if (fetchId === fetchIdRef.current) {
          const startRow = pageSize * pageIndex;
          const endRow = startRow + pageSize;
          setData(listSchedule.slice(startRow, endRow));
          //   setData(exampleData);
          setPageCount(Math.ceil(listSchedule.length / pageSize));

          setLoading(false);
        }
      }, 1000);
    },
    [listSchedule]
  );

  const handleClose = () => setShow(false);

  const handleGetAllSchedule = async () => {
    console.log("check namHoc - hocKy: ", namHoc, hocKy);
    const listScheduleData = await getAllSchedule({
      namHoc: namHoc,
      hocKy: hocKy,
    });

    if (listScheduleData.data.errCode !== 0) {
      console.log("schedule not found");
      setErrMessage("Không tìm thấy lịch thực hành");
      setLoadingData(false);
    } else {
      setLoadingData(false);
      setListSchedule(listScheduleData.data.schedule);
      setShow(false);
      console.log("check list schedule: ", listScheduleData.data.schedule);
    }
  };

  const handleShowModalGetAll = () => {
    // setFormEidt(false);
    setErrMessage("");
    setNamHoc("");
    setHocKy("");
    setShow(true);
  };

  return (
    <div className="container-fluid">
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xem lịch thực hành</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Năm học</Form.Label>
              <Form.Select
                value={namHoc || ""}
                onChange={(event) => setNamHoc(event.target.value)}
              >
                <option value="">--Năm học--</option>
                {props.listYear.length !== 0 ? (
                  props.listYear.map((item, i) => {
                    return <option key={i}>{item.namHoc}</option>;
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Học kỳ</Form.Label>
              <Form.Select
                value={hocKy || ""}
                onChange={(event) => setHocKy(event.target.value)}
              >
                <option value="">--Học kỳ--</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <p className="text-danger">{errMessage}</p>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>

          <Button variant="primary" onClick={handleGetAllSchedule}>
            Xem
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row bg-white p-4 fs-4 fw-semibold">
        Xem lịch thực hành
      </div>

      <div className="row bg-white mt-4 mx-3 p-4">
        <div className="row my-3 justify-content-end">
          <div className="col-2">
            <Button variant="primary" onClick={handleShowModalGetAll}>
              Chọn năm học và học kỳ
            </Button>
          </div>
        </div>

        {loadingData && (
          <div className="row justify-content-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {!loadingData && listSchedule.length !== 0 && (
          <DataTable
            columns={columns}
            data={data}
            fetchData={fetchDataTable}
            loading={loading}
            pageCount={pageCount}
            // handleShowModalEdit={handleShowModalEdit}
          />
        )}

        {!loadingData && listSchedule.length === 0 && (
          <div className="row my-4">
            <p className="text-center">Chưa có lịch thực hành !</p>
          </div>

          //   <table className="table">
          //     <thead>
          //       <tr>
          //         <th scope="col" rowSpan="3">
          //           Buổi
          //         </th>
          //         <th scope="col" rowSpan="3">
          //           Phòng
          //         </th>
          //         <th scope="col" colSpan="7" className="text-center">
          //           Thứ
          //         </th>
          //       </tr>
          //       <tr>
          //         <th scope="col" colSpan="2" className="text-center">
          //           2
          //         </th>
          //         <th scope="col" colSpan="2" className="text-center">
          //           3
          //         </th>
          //         <th scope="col" colSpan="2" className="text-center">
          //           4
          //         </th>
          //         <th scope="col" className="text-center">
          //           5
          //         </th>
          //       </tr>
          //       <tr>
          //         <th scope="col" className="text-center">
          //           Sáng
          //         </th>
          //         <th scope="col" className="text-center">
          //           Chiều
          //         </th>
          //         <th scope="col" className="text-center">
          //           Sáng
          //         </th>
          //         <th scope="col" className="text-center">
          //           Chiều
          //         </th>
          //         <th scope="col" className="text-center">
          //           Sáng
          //         </th>
          //         <th scope="col" className="text-center">
          //           Chiều
          //         </th>
          //         <th scope="col" className="text-center">
          //           Sáng/Chiều
          //         </th>
          //       </tr>
          //     </thead>
          //     <tbody></tbody>
          //   </table>
        )}
      </div>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    // listSchedule: state.schedule.listSchedule,
    listYear: state.year.listYear,
    listSemester: state.semester.listSemester,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setListSchedule: (listSchedule) => {
    //   dispatch({ type: "SET_LIST_SCHEDULE", payload: listSchedule });
    // },
    setListYear: (listYear) => {
      dispatch({ type: "SET_LIST_YEAR", payload: listYear });
    },
    setListSemester: (listSemester) => {
      dispatch({ type: "SET_LIST_SEMESTER", payload: listSemester });
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(Schedule);
