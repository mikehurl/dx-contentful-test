import React, { Component } from 'react';
import styled from 'styled-components';

import Card from './Card';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%
`

class CardList extends Component {
  render() {
    return (
      <Container>
        {this.props.entries && this.props.entries.map(entry => {
          return (
            <Card content={entry.fields.content} key={entry.sys.id} title={entry.fields.title} />
          )
        })}
      </Container>
    )
  }
}

export default CardList;