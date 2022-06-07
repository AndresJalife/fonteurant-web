import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ApiRoutes from "../ApiRoutes";
import DishForm from "../components/Dish/DishForm";
import {
    Avatar,
    AvatarBadge, Badge,
    Box,
    Button,
    Center,
    chakra,
    Heading,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import LayoutDefault from "../components/LayoutDefault";
import DishCard from "../components/Dish/DishCard";
import {useAuth} from "../components/AuthProvider";
import EditRestaurant from "../components/Restaurant/EditRestaurant";
import Tag from "../components/Tag";
import StarRatings from "react-star-ratings";
import ReviewModal from "../components/Restaurant/ReviewModal";
import './restaurant.css';
import {FaBitcoin, FaCalendarTimes, FaCreditCard, FaMapMarkerAlt, FaShoppingCart, FaTags} from "react-icons/fa";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import Checkout from "../components/Checkout";
import {TiTick} from "react-icons/all";
import placeholder from "../img/placeholder_restaurant.jpg";
import {SimpleGrid} from "@chakra-ui/layout";
import UploadReviewModal from "../components/Restaurant/UploadReviewModal";
import MetricsModal from "../components/Restaurant/MetricsModal";

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
    const [reviews, setReviews] = useState([])
    const [metrics, setMetrics] = useState([])
    const [menuData, setMenuData] = useState([])
    const [openDishModal, setOpenDishModal] = useState(false)
    const [showReviews, setShowReviews] = useState(false)
    const [showUploadReview, setShowUploadReview] = useState(false)
    const [userReviewd, setUserReviewd] = useState(false)
    const [showMetrics, setShowMetrics] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [currentDish, setCurrentDish] = useState(initialDishData)
    const [newDish, setNewDish] = useState(initialDishData)
    const {user} = useAuth();
    const {id} = useParams()
    const [order, setOrder] = useState([])
    const {isOpen: isOpenCart, onOpen: onOpenCart, onClose: onCloseCart} = useDisclosure()
    const {isOpen: isOpenCheckout, onOpen: onOpenCheckout, onClose: onCloseCheckout} = useDisclosure()
    const {isOpen: isOpenCompletedOrder, onOpen: onOpenCompletedOrder, onClose: onCloseCompletedOrder} = useDisclosure()

    const totalDishesInOrder = order?.map(d => d?.amount)?.reduce((a1, a2) => a1 + a2, 0)

    const CFaBitcoin = chakra(FaBitcoin);
    const CFaCreditCard = chakra(FaCreditCard);
    const CFaCalendarTimes = chakra(FaCalendarTimes);
    const CFaMapMarkerAlt = chakra(FaMapMarkerAlt);
    const CFaTags = chakra(FaTags);
    const CFaShoppingCart = chakra(FaShoppingCart);
    const CTiTick = chakra(TiTick);

    useEffect(() => {
        const fetchData = async () => {
            const data = await ApiRoutes.getRestaurant(id)
            setRestaurantData(data)
        }
        fetchData()
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            const moneyMetrics = await ApiRoutes.getMoneyMetrics(id)
            const orderMetrics = await ApiRoutes.getOrdersMetrics(id)
            setMetrics([moneyMetrics, orderMetrics])
        }
        fetchData()
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            const reviews = await ApiRoutes.getRestaurantReviews(id);
            setReviews(reviews);
            reviews.forEach((e) => {
                if (e['user_id'] === user.id) {
                    setUserReviewd(true)
                }
            })
        }
        fetchData()
    }, [id, user.id]);

    useEffect(() => {
        const getDishes = async () => {
            const data = await ApiRoutes.getDishes(id);
            setMenuData(data.map(dish => ({...dish, picture: dish?.picture})))
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
        const data = await ApiRoutes.getRestaurant(id);
        setRestaurantData(data);
        const reviews = await ApiRoutes.getRestaurantReviews(id);
        setReviews(reviews);
        reviews.forEach((e) => {
            if (e['user_id'] === user.id) {
                setUserReviewd(true)
            }
        })
        const moneyMetrics = await ApiRoutes.getMoneyMetrics(id)
        const orderMetrics = await ApiRoutes.getOrdersMetrics(id)
        setMetrics([moneyMetrics, orderMetrics])
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

    const getTags = () => {
        if (restaurantData.tags && restaurantData.tags.length > 0) {
            return restaurantData.tags.map((tag) => {
                return <Tag value={tag}/>
            })
        } else {
            return "Sin Tags";
        }
    }

    const sortOrder = (order) => {
        return order.sort((d1, d2) => d1.id - d2.id)
    }

    const addToOrder = (newDish) => {
        const dish = order.find(d => d.id === newDish.id) || newDish
        dish.amount = dish?.amount ? (dish.amount + 1) : 1
        setOrder(sortOrder([dish, ...order.filter(d => d.id !== dish.id)]))
    }

    const subtractFromOrder = (dishId) => {
        const dish = order.find(d => d.id === dishId && d?.amount > 1)
        const orderWithoutCurrentDish = order.filter(d => d.id !== dishId)
        if (dish) {
            dish.amount = dish?.amount - 1
            setOrder(sortOrder([dish, ...orderWithoutCurrentDish]))
        } else {
            setOrder(sortOrder([...orderWithoutCurrentDish]))
        }
    }

    const removeFromOrder = (dishId) => {
        setOrder(sortOrder([...order.filter(d => d.id !== dishId)]))
    }

    return (
        <LayoutDefault>
            <div className={"restoView"} style={{padding: '0 10%'}}>
                <center>
                    <SimpleGrid columns={2} spacing='10px' pt="110px" mb="8" maxWidth={"920px"}>
                        <div>
                            <Image
                                src={restaurantData?.picture || placeholder}
                                fallbackSrc={placeholder}
                                alt="Picture of restaurant"
                                boxSize='400px'
                                borderRadius='full'
                            />
                        </div>
                        <div>
                            <Heading mt={3} mb={10} color="#000000">{restaurantData?.name}</Heading>
                            <div style={{marginBottom: "50px"}}>
                                <StarRatings
                                    rating={(reviews.length > 0 ? reviews.map(r => r.score).reduce((c, s) => c + s, 0) / reviews.length : 0)}
                                    starDimension="30px"
                                    starSpacing="10px"
                                    starRatedColor="orange"
                                />
                                <br/>
                                <Button onClick={() => setShowReviews(true)} style={{marginTop: "10px"}}>Ver
                                    opiniones</Button>
                                <ReviewModal reviews={reviews} show={showReviews}
                                             onClose={() => setShowReviews(false)}/>
                                {!userReviewd && !isOwner && (<Button onClick={() => setShowUploadReview(true)}
                                                                      style={{marginTop: "10px", marginLeft: "1%"}}>Cargar
                                    opinion</Button>)}
                                <UploadReviewModal show={showUploadReview} onClose={() => {
                                    setShowUploadReview(false);
                                    fetchData();
                                }} restoName={restaurantData.name} restoId={restaurantData.id}></UploadReviewModal>
                                <br/>
                            </div>
                            <div>
                                <div className={"moneey"}>
                                    <CFaMapMarkerAlt mr={1}></CFaMapMarkerAlt>
                                    <div>
                                        <b>Dirección:</b> {restaurantData?.address}
                                        <Badge rounded="full" px="2" fontSize="0.6em" colorScheme="pink" ml={2} variant="outline">
                                            Hasta {restaurantData?.location_scope} km
                                        </Badge>
                                    </div>
                                </div>
                                {isOwner && <div className={"moneey"}>
                                    <CFaCreditCard mr={1}></CFaCreditCard>
                                    <div>CBU: {restaurantData?.cbu}</div>
                                    <CFaBitcoin ml={5} mr={1}></CFaBitcoin>
                                    <div>Wallet: {restaurantData?.wallet_address}</div>
                                </div>}
                                <div className={"moneey"}>
                                    <CFaCalendarTimes mr={1}></CFaCalendarTimes>
                                    <div>Horarios: {restaurantData?.schedule}</div>
                                </div>
                                <div className={"moneey"}>
                                    <CFaTags mr={1}></CFaTags>
                                    <div>Tags: {getTags()}</div>
                                </div>
                                <div>
                                    {isOwner && (
                                        <Button
                                            colorScheme="brand1"
                                            color='black'
                                            onClick={() => setOpenDishModal(true)}
                                        >
                                            Agregar Plato
                                        </Button>)
                                    }
                                    {isOwner && (
                                        <Button
                                            colorScheme="brand1"
                                            color='black'
                                            onClick={() => setShowMetrics(true)}
                                            marginLeft="1%"
                                        >
                                            Ver Métricas
                                        </Button>)}
                                    {isOwner && (<Button
                                        colorScheme="brand1"
                                        color='black'
                                        onClick={() => setShowEditRestaurant(true)}
                                        marginLeft="1%"
                                    >
                                        Editar Restaurante
                                    </Button>)}
                                </div>
                                {isOwner && (
                                    <EditRestaurant data={restaurantData} show={showEditRestaurant} onClose={() => {
                                        fetchData();
                                        setShowEditRestaurant(false);
                                    }}/>)}
                                {isOwner && (<MetricsModal metrics={metrics} show={showMetrics}
                                                           onClose={() => setShowMetrics(false)}/>)}
                                <DishForm
                                    restaurantId={restaurantData?.id}
                                    show={openDishModal}
                                    onClose={onCloseDishForm}
                                    edit={editMode}
                                    onSubmit={setNewDish}
                                    currentDish={currentDish}
                                />
                            </div>
                        </div>
                    </SimpleGrid>
                </center>
                <div className={"moneey"}>
                    <CFaTags mr={1}></CFaTags>
                    <div>Tags: {getTags()}</div>
                </div>
                <Wrap spacing='25px' width="100%" py="20px">
                    {menuData.map((dish) => (
                            <WrapItem key={dish.id}>
                                <DishCard
                                    dish={dish}
                                    isOwner={isOwner}
                                    onAdd={addToOrder}
                                    onEdit={onClickEditDish}
                                    onDelete={onDeleteDish}
                                />
                            </WrapItem>
                        )
                    )}
                </Wrap>
            </div>
            {!isOwner && (
                <>
                    <Box
                        position='fixed'
                        top='100px'
                        right='30px'
                        zIndex={1}
                    >
                        {order?.length ? (
                                <Avatar>
                                    <IconButton
                                        onClick={onOpenCart}
                                        colorScheme='brand1'
                                        aria-label='Ver carrito'
                                        size='lg'
                                        icon={<CFaShoppingCart color='#565656' size="22" mr={1}/>}
                                    />
                                    <AvatarBadge boxSize="1.5em" bg="green" color="white">
                                        {totalDishesInOrder}
                                    </AvatarBadge>
                                </Avatar>
                            ) :
                            (
                                <IconButton
                                    onClick={onOpenCart}
                                    colorScheme='brand1'
                                    aria-label='Ver carrito'
                                    size='lg'
                                    icon={<CFaShoppingCart color='#565656' size="22" mr={1}/>}
                                />
                            )}
                    </Box>

                    <ShoppingCart
                        isOpen={isOpenCart}
                        onClose={onCloseCart}
                        onSubmit={() => {
                            onCloseCart()
                            onOpenCheckout()
                        }}
                        order={order}
                        addToOrder={addToOrder}
                        subtractFromOrder={subtractFromOrder}
                        removeFromOrder={removeFromOrder}
                    />
                    <Checkout
                        isOpen={isOpenCheckout}
                        onClose={() => {
                            onCloseCheckout()
                            onOpenCart()
                        }}
                        onSubmit={() => {
                            onCloseCheckout()
                            setOrder([])
                            onOpenCompletedOrder()
                            console.log('Pedido completado')
                        }}
                        order={order}
                        restaurant={restaurantData}
                    />
                    <Modal isOpen={isOpenCompletedOrder} onClose={onCloseCompletedOrder}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader style={{textAlign: "center"}}>
                                Orden completada
                            </ModalHeader>
                            <ModalBody>
                                <Center>
                                    <CTiTick color="green" size={100}/>
                                </Center>
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme='brand1'
                                    width="full"
                                    color='#565656'
                                    onClick={onCloseCompletedOrder}
                                >
                                    OK
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>)
            }
        </LayoutDefault>
    )
}

export default Restaurant
