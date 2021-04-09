import styled from 'styled-components';

export default function Nav () {
    return (
        <StyledNav>
            <h2>Vinipedia</h2>
        </StyledNav>
    )
}

const StyledNav = styled.nav`
position: fixed;
top: 0;
left: 0;
background-color: #e8e8e8;
width: 100vw;
height: 10vh;
z-index: 3;
border-bottom: #ddd 1px solid;
box-shadow: 0px -5px 25px 0px #21161691;
h2 {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    color: darkred;
    text-transform: uppercase;
    font-size: 20pt;
    font-weight: 900;
    /* font-family: 'MuseoModerno', cursive; */
    font-family: 'Segoe UI', system-ui;
}
`