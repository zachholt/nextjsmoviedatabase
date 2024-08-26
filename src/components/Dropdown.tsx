import { useState } from "react";

interface MenuItem {
    value: string;
}

interface DropdownProps {
    items: MenuItem[];
    selectedValue: string;
    onSelect: (value: string) => void;
    buttonLabel?: string;
}

export default function Dropdown({ items, selectedValue, onSelect, buttonLabel = "Select an option" }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Select {buttonLabel}</label>
            <button
                className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={toggleDropdown}
            >
                {selectedValue || buttonLabel}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mb-5"
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {items.map((item) => (
                            <li key={item.value}>
                                <a
                                    onClick={() => handleSelect(item.value)}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black cursor-pointer"
                                >
                                    {item.value}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}