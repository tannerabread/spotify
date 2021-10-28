import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  background: linear-gradient(90deg, #253044, #324054);
`

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Main>{children}</Main>
      </Container>
    </>
  )
}

export default Layout