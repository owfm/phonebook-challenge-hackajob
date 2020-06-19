import React, { useState } from "react";
import styled from "@emotion/styled";
import { useFormFields } from "../lib/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const PhonebookEntry = ({ entry, edit, del }) => {
  const [editButtonsStatus, setEditButtonsStatus] = useState(
    entry.new ? "editing" : "default"
  ); // if this is a new entry, start in edit mode.

  const [fields, handleFieldChange] = useFormFields({ ...entry });

  const handleDelete = (e) => {
    del(entry.id);
  };

  const handleEdit = (e) => {
    console.log(fields);
    console.log(e);
    edit({ ...fields, new: false });
    setEditButtonsStatus("default");
  };

  const handleRevertEdit = (e) => {
    if (entry.new) del(entry.id);
    setEditButtonsStatus("default");
  };

  const validateEdit = () => {
    const { name, address, phone_number } = fields;
    if (name === "" || address === "" || phone_number === "") return false;
    return true;
  };

  const renderEditButtons = () => {
    if (editButtonsStatus === "default")
      return (
        <TableCell className="hide">
          <NoStyleButton
            hoverColour="crimson"
            onClick={() => setEditButtonsStatus("confirmDelete")}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </NoStyleButton>
          <NoStyleButton onClick={() => setEditButtonsStatus("editing")}>
            {" "}
            <FontAwesomeIcon icon={faEdit} />
          </NoStyleButton>
        </TableCell>
      );

    if (editButtonsStatus === "confirmDelete")
      return (
        <DeleteConfirmItem>
          Delete?
          {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
          <NoStyleButton hoverColour="crimson" onClick={handleDelete}>
            <FontAwesomeIcon icon={faCheck} />
          </NoStyleButton>
          {"  "}
          {"  "}
          <NoStyleButton onClick={() => setEditButtonsStatus("default")}>
            <FontAwesomeIcon icon={faTimes} />
          </NoStyleButton>
        </DeleteConfirmItem>
      );

    if (editButtonsStatus === "editing")
      return (
        <TableCell>
          <NoStyleButton disabled={!validateEdit()} onClick={handleEdit}>
            {" "}
            <FontAwesomeIcon icon={faCheck} />
          </NoStyleButton>{" "}
          <NoStyleButton onClick={handleRevertEdit}>
            {" "}
            <FontAwesomeIcon icon={faTimes} />
          </NoStyleButton>
        </TableCell>
      );
  };

  return (
    <>
      <TableRow>
        {editButtonsStatus === "editing" ? (
          <EditableContact
            fields={fields}
            handleFieldChange={handleFieldChange}
          />
        ) : (
          <Contact entry={entry} />
        )}
        {renderEditButtons()}
      </TableRow>
    </>
  );
};

export default PhonebookEntry;

const EditableContact = ({ fields, handleFieldChange }) => (
  <>
    <TableCell>
      <input
        placeholder="Name"
        name="name"
        onChange={handleFieldChange}
        value={fields.name}
      />
    </TableCell>
    <TableCell>
      <input
        placeholder="Address"
        name="address"
        onChange={handleFieldChange}
        value={fields.address}
      />
    </TableCell>
    <TableCell>
      <input
        placeholder="Phonenumber"
        name="phone_number"
        onChange={handleFieldChange}
        value={fields.phone_number}
      />
    </TableCell>
  </>
);

const Contact = ({ entry }) => (
  <>
    <TableCell>{entry.name}</TableCell>
    <TableCell>{entry.address}</TableCell>
    <TableCell>{entry.phone_number}</TableCell>
  </>
);

const TableRow = styled.tr`
  height: 50px;
  padding: 0.5rem;
  & .hide {
    visibility: hidden;
  }

  &:hover {
    background: gainsboro;
  }
  &:hover .hide {
    visibility: visible;
  }
`;

const TableCell = styled.td`
  padding: 0.5rem;
`;

const NoStyleButton = styled.button`
  background: none;
  border: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    font-size: 1.2rem;
    color: ${(props) => props.hoverColour};
  }
`;

const DeleteConfirmItem = styled.td``;
