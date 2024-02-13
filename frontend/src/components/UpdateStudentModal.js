import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { updateStudent } from '../services/StudentService';

function UpdateStudentModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nom: e.target.nom.value,
            prenom: e.target.prenom.value,
            niveau: e.target.niveau.value,
            matiere: e.target.matiere.value,
            matricule: e.target.matricule.value,
            date: e.target.date.value,
            status: e.target.status.value
        };

        try {
            const result = await updateStudent(props.id, data);
            if (result.message === "Étudiant mis à jour avec succès") {
                handleClose();
                Swal.fire("Updated!", "Modification avec succès", "success");
                props.update();
            }
        } catch (error) {
            alert('Failed to Update Student');
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <FaEdit />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier Etudiant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="nom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                required
                                defaultValue={props.nom}
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group controlId="prenom">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control
                                type="text"
                                name="prenom"
                                required
                                defaultValue={props.prenom}
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group controlId="niveau">
                            <Form.Label>Niveau</Form.Label>
                            <Form.Control
                                type="text"
                                name="niveau"
                                required
                                defaultValue={props.niveau}
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group controlId="matiere">
                            <Form.Label>Matiere</Form.Label>
                            <Form.Control
                                type="text"
                                name="matiere"
                                required
                                defaultValue={props.matiere}
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group controlId="matricule">
                            <Form.Label>Matricule</Form.Label>
                            <Form.Control
                                type="text"
                                name="matricule"
                                required
                                defaultValue={props.matricule}
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                required
                                defaultValue={props.date}
                                placeholder=""
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                name="status"
                                required
                                defaultValue={props.status}
                                placeholder=""
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Annuler
                            </Button>
                            <Button variant="warning" type="submit">
                                Modifier
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal >
        </>
    );
}

export default UpdateStudentModal;