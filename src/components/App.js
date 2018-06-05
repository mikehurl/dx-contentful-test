import React, { Component } from 'react';
import styled from 'styled-components';

import contentfulClient from '../utils/contentfulClient';
import CardList from './CardList';
import Header from './Header';

const MainContainer = styled.div`
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  width: 100vw
`

const ContentContainer = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 2em;
`


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { entries: null }
  }

  componentDidMount() {
    contentfulClient.getEntries()
      .then(entries => this.setState({ entries: entries.items }))
  }

  render() {
    return (
      <MainContainer>
        <Header />
        <ContentContainer>
          <CardList entries={this.state.entries} />
        </ContentContainer>
      </MainContainer>
    )
  }

}

export default App;