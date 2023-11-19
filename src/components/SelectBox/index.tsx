import React, { useState, useEffect, FC } from "react";
import "./selectBox.scss";
import { arrow } from "../../constants/svgs";

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  onChange: (value: string) => void;
}

const tick = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -0.5 25 25"
    fill="none"
    className="selected-tick"
  >
    <path
      d="M5.5 12.5L10.167 17L19.5 8"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SelectBox: FC<SelectBoxProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    if (selectedOption !== option) {
      setSelectedOption(option);
      onChange(option.value);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    handleOptionClick(options[0]);
  }, []);

  return (
    <div className="select_box" data-active={isOpen}>
      <div className="select_box--selected" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : "Select an option"}
        {arrow}
      </div>
      <ul className="select_box--options">
        {options.map((option) => (
          <li key={option.value} onClick={() => handleOptionClick(option)}>
            <div className="option_content">
              <span>{option.label}</span>
              {selectedOption === option && tick}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectBox;
