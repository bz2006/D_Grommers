import { useState } from 'react';

type DropdownProps = {
  buttonLabel: string;
  options: string[];
};

const SearchDropdown = ({ buttonLabel, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div className="relative group">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-56 mt-5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-200"
      >
        <span className="mr-2">{buttonLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`absolute  mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${isOpen ? '' : 'hidden'}`}
      >
        {/* Search input */}
        <input
          className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
          type="text"
          placeholder="Search items"
          autoComplete="off"
          onChange={handleSearchInput}
        />
        {/* Dropdown content */}
        {options.map((option, index) => (
          <a
            key={index}
            href="#"
            className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md ${
              option.toLowerCase().includes(searchTerm) ? '' : 'hidden'
            }`}
          >
            {option}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchDropdown;
