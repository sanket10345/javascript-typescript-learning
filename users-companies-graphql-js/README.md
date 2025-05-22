
# Users & Companies GraphQL API

This project is a simple backend server demonstrating **GraphQL** with **Node.js** and **Express**, using a `json-server` as a mock database. You can perform CRUD operations on users and companies, and experiment with nested GraphQL queries.

---

## 📦 Features

- Query users and companies with flexible, nested GraphQL queries.
- Perform mutations: add, edit, and delete users.
- Easily extendable for new entities and relations.
- Modern, beginner-friendly backend stack (Node.js, Express, GraphQL, axios, json-server).

---

## 📁 Project Structure

```
.
├── db.json               # Mock database (served by json-server)
├── server.js             # Main Express + GraphQL server
└── schema/
    └── schema.js         # GraphQL schema, types, queries, and mutations
```

---

## 🚀 Getting Started

1. **Install dependencies**
    ```sh
    npm install
    ```

2. **Run json-server** (in one terminal):
    ```sh
    npm run json:server
    ```
    This starts the REST mock API at [http://localhost:3000](http://localhost:3000).

3. **Run the GraphQL server** (in another terminal):
    ```sh
    npm run dev
    ```
    By default, GraphQL Playground or GraphiQL will be available at [http://localhost:4000/graphql](http://localhost:4000/graphql).

---

## 📝 Example GraphQL Queries

### Get a User by ID

```graphql
{
  user(id: "23") {
    id
    firstName
    age
    company {
      id
      name
    }
  }
}
```

### Get a Company and Its Users

```graphql
{
  company(id: "2") {
    id
    name
    description
    users {
      id
      firstName
    }
  }
}
```

---

## 🛠 Example Mutations

### Add a User

```graphql
mutation {
  addUser(firstName: "Sam", age: 28, companyId: "1") {
    id
    firstName
    age
    company {
      name
    }
  }
}
```

### Edit a User

```graphql
mutation {
  editUser(id: "23", firstName: "Billy", age: 22) {
    id
    firstName
    age
  }
}
```

### Delete a User

```graphql
mutation {
  deleteUser(id: "23") {
    id
    firstName
  }
}
```

---

## 📖 Notes

- The project uses `axios` to fetch data from the REST API provided by `json-server`.
- All data changes will be reflected in `db.json`.
- If you encounter issues or have ideas for improvement, feel free to open a pull request or create an issue.

---

## 📚 Useful Links

- [GraphQL Documentation](https://graphql.org/learn/)
- [json-server GitHub](https://github.com/typicode/json-server)
- [Express GraphQL](https://github.com/graphql/express-graphql)

---

**Happy GraphQL-ing! 🚀**
