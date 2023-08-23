import React from "react";
import { NOISES } from "../../store/models/noise.interface";

interface IDropDownProps {
    options: Array<NOISES>
    selectedOption: string
    onSelect: (option: NOISES) => void
}

export const Dropdown: React.FC<IDropDownProps> = ({ options, selectedOption, onSelect }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSelect = (option: NOISES) => {
        onSelect(option);
        setOpen(false);
    };

    return (
        <div>
            <input type="text" value={selectedOption} disabled={open} />
            <button type="button" onClick={handleClick}>
                {open ? "Закрыть" : "Открыть"}
            </button>
            {open && (
                <ul>
                    {options.map((option) => (
                        <li key={option} onClick={() => handleSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};