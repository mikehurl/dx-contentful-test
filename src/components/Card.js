import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import TextTruncate from 'react-text-truncate';
import { v4 as uuid } from 'uuid';

import breakpoints from '../utils/breakpoints';

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 8px 8px 8px #7f7f7f;
  display: flex;
  flex-direction: column;
  height: ${props => props.isExpanded ? 'auto' : '15em'};
  margin-bottom: 2em;
  width: 85%;

  @media screen and (min-width: ${breakpoints.medium.minWidth}) {
    margin: 0 2em 2em 2em;
    width: ${props => props.isExpanded ? '37.5em' : '15em'};
  }
`

const Header = styled.div`
  align-items: center;
  background-color: #0070ad;
  cursor: pointer;
  display: flex;
  height: 3em;
  width: 100%;

  & h2 {
    color: #fcfcfc;
    font-size: 1.1em;
    font-weight: normal;
    padding-left: 0.5em;
  }
`

const Content = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 0.5em;
  width: 100%;
`

const ImageContainer = styled.div`
  display: flex;
  height: 3.125em;
  justify-content: center;
  width: 100%;
`

const Footer = styled.div`
  align-items: center;
  border-top: 2px solid #ececec;
  color: #0070ad;
  cursor: normal;
  display: flex;
  height: 2em;
  width: 100%;
`

const Button = styled.button`
background: none;
border: ${props => props.isSelected ? '1px solid #0070ad' : 'none'};
color: #0b5f75;
cursor: pointer;  
margin-left: 0.5em;

&:after {
  content: ${props => props.isSelected ? 'X' : ''};
}
`

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = { isExpanded: null, tagSelected: null };
    this.expandOrCondenseCard = this.expandOrCondenseCard.bind(this)
    this.formatContent = this.formatContent.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  expandOrCondenseCard(cardId) {
    this.setState(prevState => {
      if (cardId === prevState.isExpanded) {
        return { isExpanded: null }
      }
      return { isExpanded: cardId }
    })
  }

  formatContent(content) {
    const paragraphs = content.split('\n')
    return paragraphs.map(paragraph => (
      <Fragment key={uuid()}>
        <p>{paragraph}</p>
        <br />
      </Fragment>
    ))
  }

  onClick(contentType, tag) {
    if (this.state.tagSelected === tag) {
      this.setState({ tagSelected: null }, () => this.props.onTagDeselected())
    } else {
      this.setState({ tagSelected: tag })
      this.props.onTagClick(contentType, tag)
    }
  }

  render() {
    const { isExpanded } = this.state
    const { content, contentType, id, image, imageAlt, tags, title } = this.props;

    return (
      <Container isExpanded={isExpanded === id ? true : false}>
        <Header onClick={() => this.expandOrCondenseCard(id)} ><h2>{title}</h2></Header>
        <Content isExpanded onClick={() => this.expandOrCondenseCard(id)} >
          <ImageContainer>
            {image && <img src={image + '?fit=thumb&f=top_left&h=50&w=240'} alt={imageAlt} />}
          </ImageContainer>
          {isExpanded ? this.formatContent(content) : <TextTruncate line={6} truncateText='...' text={content} />}
        </Content>
        <Footer>{tags && tags.map(tag => {
          return (
            <Button isSelected={this.state.tagSelected === tag} onClick={() => this.onClick(contentType, tag)} key={uuid()}>{tag}</Button>
          )
        })}</Footer>
      </Container>
    )
  }
}

export default Card