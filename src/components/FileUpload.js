import {chakra, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {AiFillPicture} from "react-icons/all";

const CAiFillPicture = chakra(AiFillPicture);

const FileUpload = ({name, placeholder, stateRef}) => {
    const [filename, setFilename] = useState('');
    const [file, setFile] = useState();
    const inputRef = useRef();

    useEffect(() => {
        stateRef.current = { filename, file }
    }, [filename, file])

    const getFilenameFromPath = (path) => {
        const pathToArray = path?.split("\\") || []
        return pathToArray.length ? pathToArray[pathToArray.length - 1] : ''
    }

    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                children={<CAiFillPicture color="gray.500"/>}
            />
            <input
                type='file'
                accept='image/*'
                name={name}
                ref={inputRef}
                style={{display: 'none'}}
                onChange={() => {
                    setFilename(getFilenameFromPath(inputRef?.current?.value || ''))
                    setFile(inputRef?.current?.files?.[0])
                }}
            />
            <Input
                placeholder={placeholder || "Foto"}
                onClick={() => inputRef.current.click()}
                value={filename}
                onChange={() => {
                }}
            />
        </InputGroup>
    )
}

export default FileUpload
