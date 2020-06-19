import React from "react";
import styled from "@emotion/styled";

import PhonebookEntry from "./PhonebookEntry";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Phonebook = ({
  filter,
  entries,
  operations: { addNew, sort, edit, del },
}) => {
  const [filterString, setFilterString] = React.useState("");
  const handleFilterChange = (e) => {
    setFilterString(e.target.value);
  };

  const getVisibleEntries = () => {
    return [...entries].filter(
      (item) =>
        item.name.toLowerCase().includes(filterString.toLowerCase()) ||
        item.address.toLowerCase().includes(filterString.toLowerCase()) ||
        item.phone_number.toLowerCase().includes(filterString.toLowerCase()) ||
        item.new
    );
  };

  return (
    <PhonebookWrapper>
      <Searchbar
        placeholder="Search..."
        type="text"
        value={filterString}
        onChange={handleFilterChange}
      />
      <Table>
        <thead>
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
        </thead>
        <tbody>
          {getVisibleEntries().map((entry) => (
            <PhonebookEntry
              key={entry.id}
              entry={entry}
              edit={edit}
              del={del}
            />
          ))}
        </tbody>
      </Table>
      <AddNewContactButton onClick={() => addNew()}>
        <FontAwesomeIcon icon={faUserPlus} /> Add Contact
      </AddNewContactButton>
    </PhonebookWrapper>
  );
};

export default Phonebook;

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
  padding: 0.5rem;
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
  transition: all 0.2s ease-in-out;
  &:hover {
    font-size: 1.1rem;
    box-shadow: 4px 4px 4px 4px #ddd;
  }
`;

const Searchbar = styled.input`
  margin-bottom: 2rem;
  color: midnightblue;
  font-size: 1.2rem;
  padding: 0.5rem;
  font-weight: bold;
`;
