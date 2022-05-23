import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ApiRoutes from "../ApiRoutes";
import DishForm from "../components/Dish/DishForm";
import {Button, Heading, Wrap, WrapItem} from "@chakra-ui/react";
import LayoutDefault from "../components/LayoutDefault";
import DishCard from "../components/Dish/DishCard";
import {useAuth} from "../components/AuthProvider";
import {downloadFile} from "../utils/DropboxAPI";


const Restaurant = () => {
    const initialDishData = {
        id: '',
        name: '',
        price: '',
        picture: '',
        description: ''
    };
    const [restaurantData, setRestaurantData] = useState({})
    const [menuData, setMenuData] = useState([])
    const [openDishModal, setOpenDishModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [currentDish, setCurrentDish] = useState(initialDishData)
    const [newDish, setNewDish] = useState(initialDishData)
    const {user} = useAuth();
    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const data = await ApiRoutes.getRestaurant(id)
            setRestaurantData(data)
        }
        fetchData()
    }, [id])

    useEffect(() => {
        const getDishes = async () => {
            const data = await ApiRoutes.getDishes(id);
            setMenuData(data.map(dish => ({...dish, picture: dish?.picture ? downloadFile(dish.picture) : ''})))
        }
        getDishes()
    }, [id])

    useEffect(() => {
        if (menuData.find(dish => dish?.id === newDish?.id)) {
            setMenuData(m => m.map(dish => newDish.id === dish?.id ? newDish : dish))
        } else if (newDish?.id) {
            setMenuData(m => [newDish, ...m])
        }
    }, [newDish])

    const isOwner = user?.my_restaurant_id === id

    const onClickEditDish = (dish) => {
        setEditMode(true)
        setCurrentDish(dish)
        setOpenDishModal(true)
    }

    const onCloseDishForm = () => {
        setEditMode(false)
        setOpenDishModal(false)
    }

    const onDeleteDish = (dishId) => {
        ApiRoutes.deleteDish(id, dishId).then(() => {
            setMenuData(menuData.filter(dish => dishId !== dish?.id))
        })
    }

    return (
        <LayoutDefault>
            <div style={{padding: '0 10%'}}>
                <Heading color="#565656" pt="110px">{restaurantData?.name}</Heading>
                <div>
                    <div>Id: {restaurantData?.id}</div>
                    <div>Dirección: {restaurantData?.address}</div>
                    <div>Cobertura: {restaurantData?.location_scope}</div>
                    <div>CBU: {restaurantData?.cbu}</div>
                    <div>Id dueño: {restaurantData?.owner_id}</div>
                    <div>Horarios: {restaurantData?.schedule}</div>
                    <div>Wallet: {restaurantData?.wallet_address}</div>
                    {isOwner && (
                        <Button
                            colorScheme="brand1"
                            color='black'
                            onClick={() => setOpenDishModal(true)}
                        >
                            Agregar Plato
                        </Button>)
                    }
                    <DishForm
                        restaurantId={restaurantData?.id}
                        show={openDishModal}
                        onClose={onCloseDishForm}
                        edit={editMode}
                        onSubmit={setNewDish}
                        currentDish={currentDish}
                    />
                </div>
                <Wrap spacing='25px' width="100%" py="20px">
                    {menuData.map((dish) => (
                            <WrapItem key={dish.id}>
                                <DishCard
                                    dish={dish}
                                    isOwner={isOwner}
                                    onEdit={onClickEditDish}
                                    onDelete={onDeleteDish}
                                />
                            </WrapItem>
                        )
                    )}
                </Wrap>
            </div>
        </LayoutDefault>
    )
}

export default Restaurant
