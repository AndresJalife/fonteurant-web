import { useLocation } from "react-router-dom"
import {Button} from "@chakra-ui/react";
import EditRestaurant from "../components/Restaurant/EditRestaurant";
import React, {useState} from "react";

const MyRestaurant = () => {

    const {state} = useLocation();

    const [showEditRestaurant, setShowEditRestaurant] = useState(false);

    return (<div>
                <div>{JSON.stringify(state.data)}</div>
                <Button
                    borderRadius={0}
                    onClick={() => setShowEditRestaurant(true)}
                    variant="solid"
                    colorScheme="brand1"
                    color='#565656'
                    width="full">
                    Editar Restaurante
                </Button>
                <EditRestaurant data={state.data} show={showEditRestaurant} onClose={() => setShowEditRestaurant(false)}/>
            </div>
    )
}

export default MyRestaurant