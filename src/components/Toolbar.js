import {Button, Flex, Spacer} from "@chakra-ui/react";
import styled from 'styled-components'
import {ImSpoonKnife} from "react-icons/all";


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

const Toolbar = ({isLoginOpen, toggleLogin}) => {
  return (
    <ToolbarContainer>
      <Flex alignItems='center'>
        <ImSpoonKnife color='black' size='28px' style={{marginTop: '10px', marginRight: '5px'}}/>
        <LogoTitle>Fonteurant</LogoTitle>
        <Spacer/>
        <Button
          mt='8px'
          colorScheme='brand2'
          color="white"
          variant='solid'
          onClick={toggleLogin}
        >
          {isLoginOpen ? "Registrarse" : "Ingresar"}
        </Button>
      </Flex>
    </ToolbarContainer>
  )
}

export default Toolbar
