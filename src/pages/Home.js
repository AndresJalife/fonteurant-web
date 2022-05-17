import LayoutDefault from "../components/LayoutDefault";
import background from '../img/burger.jpg';
import styled from 'styled-components'

const BurgerContainer = styled.div`
  max-width: 100vw;
  max-height: 100vh;
`

const BurgerImg = styled.img`
  width: 5000px;
  height: 100vh;
  object-fit: cover;
`

const Home = () => {

    return (
        <LayoutDefault>
            <BurgerContainer>
                <BurgerImg src={background} alt="logo"/>
            </BurgerContainer>
        </LayoutDefault>
    )
}

export default Home
