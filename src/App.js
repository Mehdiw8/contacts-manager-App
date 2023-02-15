import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { ContextContact } from './context/contextContact';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { ToastContainer, toast } from 'react-toastify';

// import { contactSchema } from './validations/contactValidation';
import {
  AddContact,
  ViewContact,
  Contacts,
  EditContact,
  Navbar,
} from './components';
import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from './services/contactService';

import './App.css';
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from './helpers/colors';

const App = () => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createContactForm = async (values) => { 
    setLoading((draft) => !draft);
    try {
      const { data, status } = await createContact(values);
      if (status === 201) {
        toast.success('مخاطب با موفقیت ساخته شد', { icon: '🚀' });
        /* const allContacts = [...contacts, data];
        setContacts(allContacts)
        */
        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });
        setLoading((draft) => !draft);
        navigate('/contacts');
      }
    } catch (err) {
      console.log(err);
      setLoading((draft) => !draft);
    }
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: '1em',
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    const contactsBackUp = [...contacts];

    try {
      setContacts((draft) => {
        return draft.filter((c) => c.id != contactId);
      });
      setFilteredContacts((draft) => {
        return draft.filter((c) => c.id != contactId);
      });
      toast.error('مخاطب با موفقیت پاک شد', { icon: '💣' });
      const { status } = await deleteContact(contactId);
      if (status != 200) {
        setContacts(contactsBackUp);
        setFilteredContacts(contactsBackUp);
      }
    } catch (err) {
      console.log(err.message);
      setContacts(contactsBackUp);
      setFilteredContacts(contactsBackUp);
    }
  };
  // let debounceHandle;
  const contactSearch = _.debounce((quary) => {
    if (!quary) return setFilteredContacts(contacts);
    // clearTimeout(debounceHandle);
    // debounceHandle = setTimeout(() => {
    setFilteredContacts(
      contacts.filter((contact) => {
        return contact.fullname.toLowerCase().includes(quary.toLowerCase());
      })
    );
    // }, 1000);
  }, 1000);

  return (
    <ContextContact.Provider
      value={{
        loading,
        setLoading,
        contacts,
        setContacts,
        setFilteredContacts,
        filteredContacts,
        groups,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
        // errors
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContextContact.Provider>
  );
};

export default App;
