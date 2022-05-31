import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ApiRoutes from "../ApiRoutes";
import DishForm from "../components/Dish/DishForm";
import {Button, chakra, Heading, Wrap, WrapItem} from "@chakra-ui/react";
import LayoutDefault from "../components/LayoutDefault";
import DishCard from "../components/Dish/DishCard";
import {useAuth} from "../components/AuthProvider";
import {downloadFile} from "../utils/DropboxAPI";
import EditRestaurant from "../components/Restaurant/EditRestaurant";
import Tag from "../components/Tag";
import React from "react";
import './restaurant.css';
import {FaBitcoin, FaCalendarTimes, FaCreditCard, FaMapMarkerAlt, FaTags} from "react-icons/fa";

const Restaurant = () => {
    const initialDishData = {
        id: '',
        name: '',
        price: '',
        picture: '',
        description: '',
        tags: []
    };
    const [showEditRestaurant, setShowEditRestaurant] = useState(false);
    const [restaurantData, setRestaurantData] = useState({})
    const [menuData, setMenuData] = useState([])
    const [openDishModal, setOpenDishModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [currentDish, setCurrentDish] = useState(initialDishData)
    const [newDish, setNewDish] = useState(initialDishData)
    const {user} = useAuth();
    const {id} = useParams()

    const CFaBitcoin = chakra(FaBitcoin);
    const CFaCreditCard = chakra(FaCreditCard);
    const CFaCalendarTimes = chakra(FaCalendarTimes);
    const CFaMapMarkerAlt = chakra(FaMapMarkerAlt);
    const CFaTags = chakra(FaTags);

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
        if (newDish?.id) {
            setMenuData(m =>
                m.find(dish => dish?.id === newDish?.id)
                    ? m.map(dish => newDish.id === dish?.id ? newDish : dish)
                    : [newDish, ...m]
            )
        }
    }, [newDish])

    const isOwner = user?.my_restaurant_id === parseInt(id);

    const fetchData = async () => {
        const data = await ApiRoutes.getRestaurant(id)
        setRestaurantData(data)
    }

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

    const getEditButton = () => {
        return <div>
            <Button
                colorScheme="brand1"
                color='black'
                onClick={() => setShowEditRestaurant(true)}
                marginTop="1%"
            >
                Editar Restaurante
            </Button>
            <EditRestaurant data={restaurantData} show={showEditRestaurant} onClose={() => {
                fetchData();
                setShowEditRestaurant(false);
            }}/>
        </div>
    }

    const getTags = () => {
        if (restaurantData.tags && restaurantData.tags.length > 0) {
            return restaurantData.tags.map((tag) => {
                return <Tag value={tag}/>
            } )
        } else {
            return "Sin Tags";
        }
    }

    return (
        <LayoutDefault>
            <div className={"restoView"} style={{padding: '0 10%'}}>
                <Heading mt={3} mb={10} color="#000000" pt="110px">{restaurantData?.name}</Heading>
                <div>
                    <div className={"moneey"}>
                        <CFaMapMarkerAlt mr={1}></CFaMapMarkerAlt>
                        <div><b>Dirección:</b> {restaurantData?.address}</div>
                    </div>
                    <div className={"moneey"}>
                        <CFaCreditCard mr={1}></CFaCreditCard>
                        <div>CBU: {restaurantData?.cbu}</div>
                        <CFaBitcoin ml={5} mr={1}></CFaBitcoin>
                        <div>Wallet: {restaurantData?.wallet_address}</div>
                    </div>
                    <div className={"moneey"}>
                        <CFaCalendarTimes mr={1}></CFaCalendarTimes>
                        <div>Horarios: {restaurantData?.schedule}</div>
                    </div>
                    <div className={"moneey"}>
                        <CFaTags mr={1}></CFaTags>
                        <div>Tags: {getTags()}</div>
                    </div>
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
                    {isOwner && getEditButton()}
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
