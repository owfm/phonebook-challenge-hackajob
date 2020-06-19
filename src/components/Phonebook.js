import React from "react";
import styled from "@emotion/styled";

import PhonebookEntry from "./PhonebookEntry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Phonebook = ({ entries, operations: { addNew, sort, edit, del } }) => {
  const PhonebookWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin: 2rem auto;
    max-width: 80%;
  `;

  const HeaderRow = styled.tr`
    height: 50px;
    margin-bottom: 5px;
    background: midnightblue;
  `;

  const HeaderItem = styled.th`
    height: 50px;
    min-width: 120px;
    color: snow;
    font-weight: bold;
  `;

  const Table = styled.table`
    padding: 2px;
  `;

  const AddNewContactButton = styled.button`
    margin: 1rem auto;
    background: midnightblue;
    color: snow;
    border: 3px solid black;
    border-bottom: 5px solid midnightblue;
    size: 1.3rem;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
    box-shadow: 2px 2px 2px 2px #ddd;
  `;

  return (
    <PhonebookWrapper>
      <Table>
        <HeaderRow>
          <HeaderItem>
            <span onClick={() => sort("name")}>
              Name <FontAwesomeIcon icon={faSort} />
            </span>
          </HeaderItem>
          <HeaderItem>
            <span onClick={() => sort("address")}>
              Address <FontAwesomeIcon icon={faSort} />
            </span>
          </HeaderItem>
          <HeaderItem>
            <span onClick={() => sort("phone_number")}>
              Phone Number <FontAwesomeIcon icon={faSort} />
            </span>
          </HeaderItem>
          <HeaderItem />
        </HeaderRow>
        {entries.map((entry) => (
          <PhonebookEntry key={entry.id} entry={entry} edit={edit} del={del} />
        ))}
      </Table>
      <AddNewContactButton onClick={() => addNew()}>
        <FontAwesomeIcon icon={faUserPlus} /> Add Contact
      </AddNewContactButton>
    </PhonebookWrapper>
  );
};

export default Phonebook;
