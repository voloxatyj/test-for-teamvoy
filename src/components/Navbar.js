import React from 'react';
import styled from 'styled-components';

const Navbar = () => {
		return (
			<NavbarWrapper className="navbar fixed-top navbar-light bg-primary mb-5">
				<span className="navbar-brand mb-0 h1 mx-auto">Pokedex</span>				
			</NavbarWrapper>
		)
}

const NavbarWrapper = styled.nav`
	border: 5px solid #fff;
`;

export default Navbar;