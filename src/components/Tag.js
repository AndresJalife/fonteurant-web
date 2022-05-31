import {Badge} from '@chakra-ui/react';

const Tag = ({value, color}) => {
    return ( <Badge rounded="full" px="2" fontSize="0.7em" colorScheme={color} mr={1}> {value} </Badge> );
}
export default Tag;

