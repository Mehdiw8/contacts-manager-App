import { PURPLE } from '../../helpers/colors';
import { useContext } from 'react';
import { ContextContact } from '../../context/contextContact';
const SearchContact = () => {
  const { contactQuery, contactSearch } = useContext(ContextContact);
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: PURPLE }}
      >
        <i className="fas fa-search" />
      </span>
      <input
        dir="rtl"
        type="text"
        onChange={(e) => contactSearch(e.target.value)}
        className="form-control"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default SearchContact;
