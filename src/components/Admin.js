import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './Header';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw
`

const FormContainer = styled.main`
  flex-grow: 1;
  
  & h1 {
    text-align: center;
  }
`

class Admin extends Component {
  render() {
    return (
      <MainContainer>
        <Header />
        <FormContainer>
          <h1>Add new content</h1>
        </FormContainer>
      </MainContainer>
    )
  }
}

export default Admin;