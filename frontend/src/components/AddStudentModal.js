import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { addStudent } from '../services/StudentService';
import Swal from "sweetalert2";

const AddStudentModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.prenom.value);
        const data = {
            nom: e.target.nom.value,
            prenom: e.target.prenom.value,
            niveau: e.target.niveau.value,
            matiere: e.target.matiere.value,
            matricule: e.target.matricule.value,
            date: e.target.date.value,
            status: e.target.status.value
        }
        //console.log(data);
        addStudent(data)
            .then((result) => {
                console.log(result);
                if (result.message === "Étudiant créé") {
                    props.onHide(true);
                    Swal.fire("Succes!", "Ajout avec succes", "success");
                }

                props.setUpdated(true);
                console.log(props)
            },
                (error) => {
                    Swal.fire("Error!", "", "error");
                })
    }

    return (
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Information des etudiants
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="nom">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control type="text" name="nom" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="prenom">
                                <Form.Label>Prenom</Form.Label>
                                <Form.Control type="text" name="prenom" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="niveau">
                                <Form.Label>Niveau</Form.Label>
                                <Form.Control type="text" name="niveau" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="matiere">
                                <Form.Label>Matiere</Form.Label>
                                <Form.Control type="text" name="matiere" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="matricule">
                                <Form.Label>Matricule</Form.Label>
                                <Form.Control type="text" name="matricule" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" name="date" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" name="status" required placeholder="" />
                            </Form.Group>
                            <Form.Group>
                                <Modal.Footer>
                                    <Button variant="primary" type="submit">
                                        Ajouter
                                    </Button>
                                    <Button variant="danger" onClick={props.onHide}>
                                        Annuler
                                    </Button>
                                </Modal.Footer>
                            </Form.Group>
                        </Form>
                    </Row>
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default AddStudentModal;