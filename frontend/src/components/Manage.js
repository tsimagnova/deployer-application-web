import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddStudentModal from "./AddStudentModal";
import UpdateStudentModal from "./UpdateStudentModal";
import { getStudents, deleteStudent } from '../services/StudentService';
import Spinner from 'react-bootstrap/Spinner';
import Swal from "sweetalert2";

const Manage = () => {
  const [students, setStudents] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isMounted.current) {
      fetchStudents();
      isMounted.current = true;
    }
  }, []);


  const fetchStudents = async => {
    setLoading(true);
    getStudents()
      .then((res) => {
        setStudents(res.data)
        console.log(res.data)
      }).catch((error) => {
        console.error(error)
      }).finally(() => {
        setLoading(false)
      })
  }

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const deleteTodo = (studentId) => {
    deleteStudent(studentId)
      .then(() => {
        Swal.fire("Supprimé!", "", "success");
        fetchStudents();
      })
      .catch((error) => Swal.fire("Erreur", error.toString(), "error"));
  };

  const handleDelete = (e, studentId) => {
    e.preventDefault();
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Cette action est irréversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Annuler",
      confirmButtonText: "Supprimer",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(studentId);
      }
    });
  };

  let AddModelClose = () => setAddModalShow(false);

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <p id="manage"></p>
        <ButtonToolbar>
          <Button variant="primary" onClick={handleAdd}>
            Ajouter étudiant
          </Button>
          <AddStudentModal show={addModalShow} setUpdated={fetchStudents} onHide={AddModelClose}></AddStudentModal>
        </ButtonToolbar>
        <br />
        <br />
        <br />
        <br />
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
              <th>ACTION</th>
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
                  <td>
                    <>
                      <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, stu.Id)}>
                        <RiDeleteBin5Line />
                      </Button>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <UpdateStudentModal
                        id={stu.Id}
                        nom={stu.nom}
                        prenom={stu.prenom}
                        niveau={stu.niveau}
                        matiere={stu.matiere}
                        matricule={stu.matricule}
                        date={stu.date}
                        status={stu.status}
                        update={fetchStudents}
                      />

                    </>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Manage;
