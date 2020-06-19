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
  const { name, address, phone_number } = entry;
  const [editButtonsStatus, setEditButtonsStatus] = useState(
    entry.new ? "editing" : "default"
  ); // if this is a new entry, start in edit mode.
  const [hovering, setHovering] = useState(false);
  const [fields, handleFieldChange] = useFormFields({ ...entry });

  const TableRow = styled.tr`
    height: 50px;
    padding: 0.5rem;

    &:hover {
      background: gainsboro;
    }
  `;

  const TableCell = styled.td`
    padding: 0.5rem;
  `;

  const NoStyleButton = styled.button`
    background: none;
    border: none;
  `;
  const ConfirmButton = styled.button`
    background: none;
    border: none;
    color: crimson;
    font-weight: bold;
  `;

  const Input = styled.input`
    width: inherit;
  `;

  const DeleteConfirmItem = styled.td`
    font-weight: bold;
    color: crimson;
  `;

  const handleDelete = (e) => {
    del(entry.id);
  };

  const handleMouseEnter = (e) => {
    setHovering(true);
  };

  const handleMouseLeave = (e) => {
    setHovering(false);
  };

  const handleEdit = (e) => {
    edit({ ...fields, new: false });
    setEditButtonsStatus("default");
  };

  const handleRevertEdit = (e) => {
    if (entry.new) del(entry.id);
    setEditButtonsStatus("default");
  };

  const validateEdit = () => {
    const { name, address, phone_number } = fields;
    if (name === "" || address === "" || phone_number == "") return false;
    return true;
  };

  const renderEditButtons = () => {
    if (!hovering && editButtonsStatus === "default") return <tr></tr>;

    if (hovering && editButtonsStatus === "default")
      return (
        <TableCell>
          <NoStyleButton onClick={() => setEditButtonsStatus("confirmDelete")}>
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
          Sure?
          <ConfirmButton onClick={handleDelete}>Y</ConfirmButton> /{" "}
          <ConfirmButton onClick={() => setEditButtonsStatus("default")}>
            N
          </ConfirmButton>
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

    return <tr></tr>;
  };

  const renderEntryValues = () => {
    if (editButtonsStatus !== "editing")
      return (
        <>
          <TableCell>{name}</TableCell>
          <TableCell>{address}</TableCell>
          <TableCell>{phone_number}</TableCell>
        </>
      );

    return (
      <>
        <TableCell>
          <Input
            placeholder="Name"
            name="name"
            onChange={handleFieldChange}
            value={fields.name}
          />
        </TableCell>
        <TableCell>
          <Input
            placeholder="Address"
            name="address"
            onChange={handleFieldChange}
            value={fields.address}
          />
        </TableCell>
        <TableCell>
          <Input
            placeholder="Phonenumber"
            name="phone_number"
            onChange={handleFieldChange}
            value={fields.phone_number}
          />
        </TableCell>
      </>
    );
  };

  return (
    <>
      <TableRow onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {renderEntryValues()}
        {renderEditButtons()}
      </TableRow>
    </>
  );
};

export default PhonebookEntry;
