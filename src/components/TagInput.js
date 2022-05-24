import {useRef, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    chakra,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack
} from "@chakra-ui/react";
import {FaLock, FaUserAlt} from "react-icons/fa";
import {useAuth} from "./AuthProvider";
import {FormErrorMessage} from "@chakra-ui/form-control";
import {useNavigate} from "react-router";
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
