import { createContext } from 'react';

export const ContextContact = createContext({
  loading: false,
  setLoading: () => {},
  contact: {},
  setcontacts: () => {},
  contacts: [],
  filteredContacts: [],
  groups: [],
  onContactChange: () => {},
  deleteContact: () => {},
  updateContact: () => {},
  createContact: () => {},
  contactSearch: () => {},
  errors : []
});
