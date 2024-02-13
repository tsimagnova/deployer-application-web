import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'react-bootstrap';
import { getStudents } from '../services/StudentService';
import Spinner from 'react-bootstrap/Spinner';
import "../App.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isMounted.current) {
      fetchStudents();
      isMounted.current = true;
    }
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await getStudents();
      setStudents(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOM</th>
              <th>PRENOM</th>
              <th>NIVEAU</th>
              <th>MATIERE</th>
              <th>MATRICULE</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center">
                  <Spinner animation="border" variant="primary" className="d-flex justify-content-center align-items-center" />
                </td>
              </tr>
            ) : (
              students.map((stu) => (
                <tr key={stu.Id}>
                  <td>{stu.Id}</td>
                  <td>{stu.nom}</td>
                  <td>{stu.prenom}</td>
                  <td>{stu.niveau}</td>
                  <td>{stu.matiere}</td>
                  <td>{stu.matricule}</td>
                  <td>{stu.date}</td>
                  <td>{stu.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Students;
