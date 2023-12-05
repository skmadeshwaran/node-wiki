import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

function MultiSelectAutocomplete() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const loadOptions = (inputValue, callback) => {
    // Simulate asynchronous loading of options
    setTimeout(() => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        // Add more options as needed
      ];
      const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filteredOptions);
    }, 1000); // Simulate delay
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div>
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleSelectChange}
        value={selectedOptions}
      />
      <div>
        Selected options: {selectedOptions.map(option => option.label).join(', ')}
      </div>
    </div>
  );
}

export default MultiSelectAutocomplete;
