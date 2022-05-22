import {Box, Button} from '@chakra-ui/react'
import './RestaurantCard.css'
import {useNavigate} from "react-router";

const RestaurantCard = (props) => {
    let navigate = useNavigate();

    const goToRestaurant = () => {
        navigate(`/restaurant/${props.data?.id}`)
    }

    return (
        <Box className={"restoCard"}>
            <p><b>{props.data.name}</b></p>
            <Button
                className={"restButton"}
                colorScheme="brand1" color="565656"
                onClick={goToRestaurant}
            >
                Ver Restaurante
            </Button>
        </Box>
    )
}

export default RestaurantCard
