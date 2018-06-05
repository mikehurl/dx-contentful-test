import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const Container = styled.nav`
  align-items: flex-end;
  background-color: #0070AD;
  display: flex;
  height: 4em;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  width: 100%;

  & > a {
    color: white;
    padding-bottom: 0.75em;
    padding-right: 1.75em;
  }
`

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          textDecoration: isCurrent ? `underline` : `none`
        }
      };
    }}
  />
);

class Header extends Component {
  render() {
    return (
      <Container>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/admin'>Admin</NavLink>
      </Container>
    )
  }
}

export default Header;