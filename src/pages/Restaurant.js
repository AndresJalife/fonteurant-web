import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ApiRoutes from "../ApiRoutes";
import DishForm from "../components/Dish/DishForm";
import {Button} from "@chakra-ui/react";

const Restaurant = () => {
    const [restaurantData, setRestaurantData] = useState({})
    const [openDishModal, setOpenDishModal] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const data = await ApiRoutes.getRestaurant(id)
            setRestaurantData(data)
        }
        fetchData()
    }, [id])

    return (
        <div>
            <div>Id: {restaurantData?.id}</div>
            <div>Nombre: {restaurantData?.name}</div>
            <div>Dirección: {restaurantData?.address}</div>
            <div>Cobertura: {restaurantData?.location_scope}</div>
            <div>CBU: {restaurantData?.cbu}</div>
            <div>Id dueño: {restaurantData?.owner_id}</div>
            <div>Horarios: {restaurantData?.schedule}</div>
            <div>Wallet: {restaurantData?.wallet_address}</div>
            <Button
                colorScheme="brand1"
                color='black'
                onClick={() => setOpenDishModal(true)}
            >
                Agregar Plato
            </Button>
            <DishForm
                restaurantId={restaurantData?.id}
                show={openDishModal}
                onClose={() => setOpenDishModal(false)}
            />
        </div>
    )
}

export default Restaurant
