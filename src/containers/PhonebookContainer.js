import React, { useState, useEffect } from "react";
import PhoneBook from "../components/Phonebook";
import { uuid } from "uuidv4";
import { API_URL } from "../constants";
import findIndex from "lodash/findIndex";

const emptyUser = {
  name: "",
  address: "",
  phone_number: "",
  new: true,
};

function PhonebookContainer(props) {
  const [entries, setPhonebookEntries] = useState([]);
  const [sortState, setSortState] = useState("unsorted");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const data = await fetch(API_URL);
        const json = await data.json();
        // give entries unique ID to help with editing
        const entries = json.contacts.map((entry) => {
          return { id: uuid(), ...entry };
        });
        setPhonebookEntries(entries);
      } catch (e) {
        setError("Couldn't fetch the data. Please try a refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  const phonebookOperations = {
    addNew: () =>
      setPhonebookEntries((prev) => [...prev, { ...emptyUser, id: uuid() }]),
    edit: (entry) =>
      setPhonebookEntries((prev) => {
        const index = findIndex(prev, (item) => item.id === entry.id);
        const newArray = [...prev];
        newArray[index] = entry;
        return newArray;
      }),
    del: (id) =>
      setPhonebookEntries((prev) => prev.filter((item) => item.id !== id)),
    sort: (by) => {
      if (sortState === by) {
        // already sorted by this value, reverse sort order
        setPhonebookEntries((prev) => [...prev].reverse());
        return;
      }

      setPhonebookEntries((prev) => {
        setSortState(by);
        return [...prev].sort((a, b) => {
          return a[by] > b[by] ? 1 : -1;
        });
      });
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <PhoneBook entries={entries} operations={phonebookOperations} />;
}

export default PhonebookContainer;
