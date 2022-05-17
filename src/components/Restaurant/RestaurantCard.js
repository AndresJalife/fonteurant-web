import {Box, Button} from '@chakra-ui/react'
import './RestaurantCard.css'
import {useNavigate} from "react-router";

const RestaurantCard = (props) => {
    let navigate = useNavigate();

    return (
        <Box className={"restoCard"}>
            <p><b>{props.data.name}</b></p>
            <Button className={"restButton"} onClick={() => navigate(`/restaurant/${props.data?.id}`)}>
                Ver Restaurant
            </Button>
        </Box>
    )
}

export default RestaurantCard
