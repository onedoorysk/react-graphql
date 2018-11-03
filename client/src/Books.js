import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Books = () => (
  <Query
    query={
      gql`
        {
          books {
            title,
            author,
            price
          }
        }
      `
    }
  >
    {({ loading, error, data}) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error</p>
      return data.books.map(book => (
        <div key={book.title}>
          <p>title: {`${book.title}`}</p>
          <p>author: {`${book.author}`}</p>
          <p>price: {`${book.price}`}</p>
          <hr/>
        </div>
      ))
    }}
  </Query>
)

export default Books