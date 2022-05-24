import {useState} from "react";

import {CreatableSelect} from "chakra-react-select";

const TagInput = ({values, setValues}) => {
    const [inputValue, setInputValue] = useState('');

    const components = {
        DropdownIndicator: null,
    };

    const createOption = (label: string) => ({
        label,
        value: label
    });

    const handleKeyDown = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setInputValue('')
                setValues([...values, createOption(inputValue)])
                event.preventDefault();
                break
            default:
        }
    };

    const handleChange = (value) => {
        setValues(value);
    };

    const handleInputChange = (inputValue) => {
        setInputValue(inputValue)
    };
    return (
        <CreatableSelect
            components={components}
            inputValue={inputValue}
            isClearable
            isMulti
            color='black'
            menuIsOpen={false}
            onChange={handleChange}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Definí los tags"
            value={values}
        />
    )
}

export default TagInput
