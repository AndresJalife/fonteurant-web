import {Button, Flex, Spacer} from "@chakra-ui/react";
import styled from 'styled-components'
import {ImSpoonKnife} from "react-icons/all";
import {useAuth} from "./AuthProvider";
import {useNavigate} from "react-router";
import {NavLink} from 'react-router-dom'

const ToolbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 999;
  background-color: #FDF6EC;
  padding: 6px 16px;
  border-radius: 0 0 10px 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const LogoTitle = styled.div`
  font-family: 'Roboto Slab', serif;
  font-size: 28px;
  font-weight: bold;
  margin-top: 8px;
  color: black;
`

const UserText = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-top: 12px;
  margin-right: 8px;
  color: black;
`


const Toolbar = () => {
    const {user, signOut} = useAuth();
    let navigate = useNavigate();

    return (
        <ToolbarContainer>
            <Flex alignItems='center'>
                <NavLink to={"/"}>
                    <ImSpoonKnife
                        className="cursor-pointer"
                        color='black'
                        size='28px'
                        style={{marginTop: '10px', marginRight: '5px'}}
                    />
                </NavLink>
                <LogoTitle><NavLink to={"/"}>Fonteurant</NavLink></LogoTitle>
                <Spacer/>
                {
                    user && <div>
                        <UserText>{user.email}</UserText>
                        <Button
                            mt='8px'
                            ml='4px'
                            colorScheme='brand2'
                            color="white"
                            variant='solid'
                            onClick={() => {
                                signOut();
                                navigate('/')
                            }}
                        >
                            Salir
                        </Button>
                    </div>
                }
            </Flex>
        </ToolbarContainer>
    )
}

export default Toolbar
