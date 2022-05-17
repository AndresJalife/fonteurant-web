import { Box } from '@chakra-ui/react'
import './RestaurantCard.css'
import { Button } from '@chakra-ui/react'

const RestaurantCard = (props) => {
    return (
        <Box className={"restoCard"}>
            <p ><b>{props.data.name}</b></p>
            <Button className={"restButton"} colorScheme="buttons" color="565656" >Ver Restaurante</Button>
        </Box>
    )
}

export default RestaurantCard
