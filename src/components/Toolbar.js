import {Button, Flex, Spacer} from "@chakra-ui/react";
import styled from 'styled-components'
import {ImSpoonKnife} from "react-icons/all";
import {useAuth} from "./AuthProvider";
import {Text} from "@chakra-ui/layout";
import {useNavigate} from "react-router";
import { NavLink } from 'react-router-dom'

const ToolbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: #f3d503;
  padding: 6px 16px;
  border-radius: 0 0 10px 10px;
`

const LogoTitle = styled.div`
  font-family: 'Roboto Slab', serif;
  font-size: 28px;
  font-weight: bold;
  margin-top: 8px;
  color: black;
`

const Toolbar = () => {
    const {user} = useAuth();
    let navigate = useNavigate();

    return (
        <ToolbarContainer>
            <Flex alignItems='center'>
                <NavLink to={"/"}><ImSpoonKnife
                    className="cursor-pointer"
                    color='black'
                    size='28px'
                    style={{marginTop: '10px', marginRight: '5px'}}
                /></NavLink>
                <LogoTitle><NavLink to={"/"}>Fonteurant</NavLink></LogoTitle>
                <Spacer/>
                {!user && (
                    <div>
                        <Button
                            mt='8px'
                            mr='4px'
                            colorScheme='brand2'
                            color="white"
                            variant='solid'
                            onClick={() => navigate("/login")}
                        >
                            Ingresar
                        </Button>
                        <Button
                            mt='8px'
                            ml='4px'
                            colorScheme='brand2'
                            color="white"
                            variant='solid'
                            onClick={() => navigate("/register")}
                        >
                            Registrarse
                        </Button>
                    </div>
                )}
                {
                    user && <Text fontSize='md'>{user.email}</Text>
                }
            </Flex>
        </ToolbarContainer>
    )
}

export default Toolbar
