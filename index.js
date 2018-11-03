const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server-express')

// モックデータ
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
    price: 2000
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    price: 3000
  }
]

// GraphQLのスキーマ情報
const typeDefs = gql`
  type Query { books: [Book] }
  type Book { title: String, author: String, price: Int }
`;

// resolver(データ処理)の設定
// DBからデータを取得したり、APIを呼び出したりする処理もここで記述
const resolvers = {
  Query: {
    books: () => books
  }
}

// Expressの初期化
const app = express()

// CORSの設定
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

// GraphQLのエンドポイントの追加
app.use(
  "/graphql",
  bodyParser.json(),
  cors(corsOptions),
)

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

// サーバの起動
app.listen(4000, () => {
  console.log("Go to http://localhost:4000/graphql to run queries!")
})

module.exports = app