import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormFields } from "../lib/hooks";

function EditEntryModal({ entry, open, setOpen, edit }) {
  const [fields, handleFieldChange] = useFormFields({ ...entry });

  const handleSave = (e) => {
    e.preventDefault();
    edit(fields);
    handleClose();
  };

  const handleEdit = (values) => {
    edit(values);
    setOpen(false);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              onChange={handleFieldChange}
              value={fields.name}
              type="text"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              value={fields.address}
              onChange={handleFieldChange}
              type="text"
              placeholder="Address"
            />
          </Form.Group>
          <Form.Group controlId="phone_number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone_number"
              value={fields.phone_number}
              onChange={handleFieldChange}
              type="text"
              placeholder="Phone Number"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditEntryModal;
