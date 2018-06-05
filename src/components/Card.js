import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 8px 8px 8px #7f7f7f;
  display: flex;
  flex-direction: column;
  height: 15em;
  margin-bottom: 2em;
  width: 85%
`

const Header = styled.div`
  align-items: center;
  background-color: #12b3db;
  display: flex;
  height: 15%;
  width: 100%;

  & h4 {
    font-weight: normal;
    padding-left: 0.5em;
  }
`

const Content = styled.div`
  flex-grow: 1;
  width: 100%
`

const Footer = styled.div`
  border-top: 2px solid #ececec;
  height: 12.5%;
  width: 100%
`

class Card extends Component {
  render() {
    return (
      <Container>
        <Header><h4>{this.props.title}</h4></Header>
        <Content></Content>
        <Footer></Footer>
      </Container>
    )
  }
}

export default Card