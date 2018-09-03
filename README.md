
# AWS Lambda DynamoDB Apollo GraphQL Docker

A Serverless GraphQL API on AWS Lambda and DynamoDB with local Docker development.

## Getting Started with Docker

```sh
$ git clone https://github.com/chrisfitkin/aws-serverless-graphql-docker.git
$ cd aws-serverless-graphql
$ npm install
$ npm run docker
```

---

## Explore GraphQL & DynamoDB

```sh
# List all posts
$ curl -G 'http://localhost:3000/graphql' --data-urlencode 'query={ posts }'
# {
#   "data": {
#     "post": {
#       "id": "8984b296-7d0c-4f86-9e74-543628157eae",
#       "title": "Occaecati Sit Natus Consequuntur Magnam Perferendis Velit",
#       "body": "Provident adipisci sit animi sapiente ut voluptatem cumque dolores. Et rerum et omnis iusto quos laudantium sed et. Non nihil laboriosam omnis voluptates facere reiciendis.\n \rAmet maxime repudiandae facilis qui eligendi et praesentium at. Eum sit modi. Unde itaque quos odit deleniti. Voluptatibus placeat molestiae. Dolores iusto repellendus numquam quasi nam. Officia impedit et sunt facere fuga.\n \rBeatae qui doloremque pariatur harum autem consequatur quod aut. Odio autem soluta dicta officiis. In et molestias.",
#       "user": "{\"NULL\":true}"
#     }
#   }
# }

# Create a post

# Query for the post you created

```

Open in your browser:

Apollo Playground: http://localhost:3000/graphql
DynamoDB: http://localhost:8000/shell

---

## Deployment

---

## GraphQL Queries

### Posts

```gql
{ 
  posts {
    id,
    title,
    body,
    user { 
      id,
      username,
      email
    }
	}
}
```

### Users
```gql
{ 
  users 
  { 
    id
    username
    email 
    posts {
      title
    }
  } 
}
```

#### Node traversal

One of the biggest benefits of GraphQL is being able to traverse multiple levels and complete circular references.  Here is an example

```qql
```

---

## Explore the code

### GraphQL Serverless Handler

```js
// src/server.js
```

### GraphQL `Post` type

```js
// src/graphql/types/post.js
```

```js
// src/graphql/schema.js
```

### Dynamoose `Post` Model

Dynamoose ORM library is used to enforce consistency of objects, default values, and validation for the DynamoDB table documents.  It also provides a convenient wrapper of the DynamoDB API as promises that are simple to implement in GraphQL Resolvers.

```js
// src/models/Post.js
```

Read more about the Dynamoose API: https://dynamoosejs.com/api

Combine and export all models in `models/index.js`

```js
// src/models/index.js
```

### DynamoDB `Posts` Table

```yml
# src/aws/resources/posts.table.yml
```

```yml
# serverless.yml
# ...
    seed:
      domain:
        sources:
          - table: "${self:custom.stage}.posts"
            sources: [./.seed/posts.js]
# ...
```

### `Posts` seed data

```js
// .seed/posts.js
```

### Caching

---

## Library Dependencies

### Server 

* Apollo GraphQL Server
* Serverless Framework
* Dynamoose
* dotenv

### Local development

* fakerjs
* Docker
* docker-compose
* serverless-dynamodb-local
* serverless-offline

---

## References

The following resources were used in part to develop this project.

* https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
* https://itnext.io/graphql-mongoose-a-design-first-approach-d97b7f0c869 # Model.populate
* https://blog.pusher.com/handling-authentication-in-graphql/
* https://serverless.com/blog/3rd-party-rest-api-to-graphql-serverless/
* https://github.com/serverless/serverless-graphql
* https://medium.freecodecamp.org/five-common-problems-in-graphql-apps-and-how-to-fix-them-ac74d37a293c
* https://www.apollographql.com/docs/react/advanced/caching.html

## Roadmap

- [x] Run Lambda & DynamoDB in Docker
- [x] Serve GraphQL server
- [x] Provide Dynamoose models in GraphQL context
- [x] Create sample data with faker.js
- [x] Add GraphQL Query examples for posts, comments, and users
- [ ] Rewrite posts.user field as index in Yaml config and User.posts Resolver
- [ ] Automatically restart (forever) DynamoDB in Docker
- [ ] Implement GraphQL Connectors for request caching
- [ ] Implement pagination, limit, and offset
- [ ] apollo-server-cache-redis
- [ ] Add authentication
- [ ] Add Node traversal example


