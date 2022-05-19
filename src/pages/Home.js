import {Button, Container, Flex, Heading, Stack, Text,} from '@chakra-ui/react';

import illustration from '../img/burger_crypto.jpg';
import styled from 'styled-components'

const Illustration = styled.img`
  max-height: 400px;
  object-fit: cover;
`

const Home = () => {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{base: 8, md: 10}}
                py={{base: 20, md: 28}}>
                <Heading
                    fontWeight={900}
                    fontSize={{base: '3xl', sm: '4xl', md: '6xl'}}
                    lineHeight={'110%'}
                    style={{fontFamily: "'Roboto Slab', serif"}}
                >
                    FONTEURANT
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'} fontSize={{base: 'lg', sm: 'xl', md: '2xl'}}>
                    De los mejores restaurantes a tu casa
                    <br/>
                    Pagá con <span style={{color: "#dcc310"}}>criptomonedas</span> o con el medio <br/> de pago que más te guste.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        rounded={'lg'}
                        px={6}
                        colorScheme={'brand1'}
                        color={'black'}
                        _hover={{bg: 'brand1.700'}}
                    >
                        Registrarse
                    </Button>
                    <Button rounded={'lg'} px={6}>
                        Ingresar
                    </Button>
                </Stack>
                <Flex w={'full'} justifyContent="center">
                    <Illustration src={illustration} alt="illustration"/>
                </Flex>
            </Stack>
        </Container>
    );
}

export default Home
