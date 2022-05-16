import {useAuth} from "../AuthProvider";
import { Box } from '@chakra-ui/react'
import {useNavigate} from "react-router";
import './RestaurantCard.css'
import { Button } from '@chakra-ui/react'

const RestaurantCard = (props) => {
    let navigate = useNavigate();

    return (
        <Box className={"restoCard"}>
            <p><b>{props.data.name}</b></p>
            <Button className={"restButton"}>Ver Restaurant</Button>
        </Box>
    )
}

export default RestaurantCard
