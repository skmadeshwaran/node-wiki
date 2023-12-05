import React from 'react';

const SearchField = ({ label, value, onChange }) => {
  return (
    <div className="search-field">
      <label className="search-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
        placeholder={`Search ${label}...`}
      />
    </div>
  );
};

export default SearchField;
