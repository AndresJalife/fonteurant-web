import {
    Avatar,
    Button,
    Center,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer
} from "@chakra-ui/react";
import styled from 'styled-components'
import {useAuth} from "./AuthProvider";
import {useNavigate} from "react-router";
import {NavLink} from 'react-router-dom'
import {ImSpoonKnife} from "react-icons/all";
import React, {useState} from "react";
import EditUserForm from "./User/EditUserForm";

const ToolbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 999;
  background-color: #f3d503;
  padding: 0 20px;
  border-radius: 0 0 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const LogoTitle = styled.div`
  font-family: 'Roboto Slab', serif;
  font-size: 22px;
  font-weight: bold;
  color: black;
`

const UserText = styled.span`
  font-size: 16px;
  font-weight: 700;
  margin-right: 8px;
  color: black;
`


const Toolbar = () => {
    const {user, signOut} = useAuth();
    let navigate = useNavigate();
    const [showEditUser, setShowEditUser] = useState(false);

    const goToMyRestaurant = () => {
        if (user?.my_restaurant_id) {
            navigate('/restaurant/' + user.my_restaurant_id)
        } else {
            navigate('/create-restaurant')
        }
    }

    return (
        <ToolbarContainer>
            <EditUserForm show={showEditUser} onClose={() => setShowEditUser(false)}/>
            <Flex alignItems="center" justifyContent="center">
                <Center height="70px">
                    <NavLink to={"/restaurants"}>
                        <ImSpoonKnife
                            className="cursor-pointer"
                            color='black'
                            size='24px'
                            style={{marginRight: '5px'}}
                        />
                    </NavLink>
                    <LogoTitle>
                        <NavLink to={"/restaurants"}>FONTEURANT</NavLink>
                    </LogoTitle>
                </Center>
                <Spacer/>

                <Center height="70px">
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}
                            colorScheme="brand3.500"
                            _hover={{bg: "brand1"}}
                            _focus={{bg: "brand1"}}
                        >
                            <Center height="70px">
                                <UserText>{user.email}</UserText>
                                <Avatar size={'sm'} bg='brand2.500'/>
                            </Center>
                        </MenuButton>
                        <MenuList fontSize="16px" color="black">
                            <MenuItem onClick={() => setShowEditUser(true)}>
                                <Button
                                    color="black"
                                    variant='link'
                                >
                                    Editar perfil
                                </Button>
                            </MenuItem>
                            <MenuItem onClick={goToMyRestaurant}>
                                <Button
                                    color="black"
                                    variant='link'
                                >
                                    {user?.my_restaurant_id ? "Mi restaurante" : "Crear restaurante"}
                                </Button>
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem
                                onClick={() => {
                                    signOut();
                                    navigate('/')
                                }}
                            >
                                <Button
                                    color="red"
                                    variant='link'
                                >
                                    Salir
                                </Button>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Center>
            </Flex>
        </ToolbarContainer>
    )
}

export default Toolbar
