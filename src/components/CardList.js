import React, { Component } from 'react';
import styled from 'styled-components';

import breakpoints from '../utils/breakpoints';
import Card from './Card';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: ${breakpoints.medium.minWidth}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 -2em;
  }
`

class CardList extends Component {
  render() {
    return (
      <Container>
        {this.props.entries && this.props.entries.map(entry => {
          return (
            <Card
              content={entry.fields.content}
              contentType={entry.sys.contentType.sys.id}
              id={entry.sys.id}
              image={entry.fields.image ? entry.fields.image.fields.file.url : null}
              imageAlt={entry.fields.image ? entry.fields.image.fields.title : null}
              key={entry.sys.id}
              onTagClick={this.props.onCardTagClick}
              onTagDeselected={this.props.onCardTagDeselected}
              tags={entry.fields.tags}
              title={entry.fields.title}
            />
          )
        })}
      </Container>
    )
  }
}

export default CardList;