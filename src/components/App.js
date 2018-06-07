import React, { Component } from 'react';
import styled from 'styled-components';

import { space, contentDeliveryAccessToken } from '../config.json';
import breakpoints from '../utils/breakpoints';
import contentfulClient from '../utils/contentfulClient';
import CardList from './CardList';
import Header from './Header';

const MainContainer = styled.div`
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  width: 100vw;

  @media screen and (min-width: ${breakpoints.large.minWidth}) {
    height: 100%;
    margin-left: calc((100vw - ${breakpoints.large.minWidth}) / 2);
    min-height: 100vh;
    width: ${breakpoints.large.minWidth}
  }
`

const ContentContainer = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 2em;

  & h1 {
    padding-bottom: 1em;
    text-align: center;
  }
`

const client = contentfulClient(space, contentDeliveryAccessToken);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { entries: null, isTagSelected: false }
    this.onCardTagClick = this.onCardTagClick.bind(this)
    this.onCardTagDeselected = this.onCardTagDeselected.bind(this)
  }

  componentDidMount() {
    client.getEntries({ 'order': 'sys.createdAt' })
      .then(entries => this.setState({ entries: entries.items }))
  }

  onCardTagClick(contentType, tag) {
    if (!this.state.isTagSelected) {
      client.getEntries({
        'content_type': contentType,
        'fields.tags': tag,
        'order': 'sys.createdAt'
      })
        .then(entries => this.setState({ entries: entries.items, isTagSelected: true }))
    }
  }

  onCardTagDeselected() {
    if (this.state.isTagSelected) {
      client.getEntries({ 'order': 'sys.createdAt' })
        .then(entries => this.setState({ entries: entries.items, isTagSelected: false }))
    }

  }

  render() {
    return (
      <MainContainer>
        <Header />
        <ContentContainer>
          <h1>DX(periment)</h1>
          <CardList entries={this.state.entries} onCardTagClick={this.onCardTagClick} onCardTagDeselected={this.onCardTagDeselected} />
        </ContentContainer>
      </MainContainer>
    )
  }

}

export default App;