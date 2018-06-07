import React, { Component } from 'react';
import styled from 'styled-components';
import { createClient } from 'contentful-management'
import { navigate } from '@reach/router';

import { space, contentManagementAccessToken } from '../config.json';
import breakpoints from '../utils/breakpoints';
import Header from './Header';

const MainContainer = styled.div`
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;

  @media screen and (min-width: ${breakpoints.large.minWidth}) {
    height: 100%;
    margin-left: calc((100vw - ${breakpoints.large.minWidth}) / 2);
    min-height: 100vh;
    width: ${breakpoints.large.minWidth}
  }
`

const FormContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
  & h1 {
    padding-bottom: 2em;
    text-align: center;
  }

  & form {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;

    & input {
      margin-bottom: 2.5em;
      padding-bottom: 1em;
      width: 50%;
    }

    & button {
      background-color: #0070ad;
      border: 1px solid #0070ad;
      border-radius: 5px;
      color: #ffffff;
      font-weight: 700;
      height: 3em;
      text-transform: uppercase;
      width: 9em;
    }
  }
`

const client = createClient({
  accessToken: contentManagementAccessToken
})

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { entryId: null, title: null, content: null, contentType: null, tags: null };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.createEntry = this.createEntry.bind(this);
    this.publishEntry = this.publishEntry.bind(this)
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  createEntry(event) {
    event.preventDefault()

    let contentType;
    if (this.state.contentType === 'blog') {
      contentType = 'blogPost'
    }
    if (this.state.contentType === 'case study') {
      contentType = 'caseStudy'
    }

    client.getSpace(space)
      .then(space => space.createEntry(contentType, {
        fields: {
          title: {
            'en-US': this.state.title
          },
          content: {
            'en-US': this.state.content
          },
          tags: {
            'en-US': this.state.tags.split(',')
          }
        }
      }))
      .then(entry => this.setState({ entryId: entry.sys.id },
        () => this.publishEntry()
      ))
      .catch('Entry creation error: ', console.error)
  }

  publishEntry() {
    client.getSpace(space)
      .then(space => space.getEntry(this.state.entryId))
      .then(entry => entry.publish())
      .catch('Entry publication error: ', console.error)

    navigate('/')
  }

  render() {
    return (
      <MainContainer>
        <Header />
        <FormContainer>
          <h1>Create new content</h1>
          <form action="">
            <label htmlFor="contentType">Blog or Case Study?:</label>
            <input
              type="text"
              id='contentType'
              name='contentType'
              onChange={this.handleInputChange}
            />
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id='title'
              name='title'
              onChange={this.handleInputChange}
            />
            <label htmlFor="content">Content:</label>
            <input
              type="text"
              id='content'
              name='content'
              onChange={this.handleInputChange}
            />
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id='tags'
              name='tags'
              onChange={this.handleInputChange}
            />
            <button type='submit' onClick={this.createEntry}>Submit</button>
          </form>
        </FormContainer>
      </MainContainer>
    )
  }
}

export default Admin;