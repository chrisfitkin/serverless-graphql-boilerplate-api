
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
$ curl -G 'http://localhost:3000/graphql' --data-urlencode 'query={ posts { title } }'
# {
#   "data": {
#     "post": [{
#       "title": "Occaecati Sit Natus Consequuntur Magnam Perferendis Velit",
#     }, ...]
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
    comments {
      body
      user {
        username
      }
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
    comments {
      body
      post {
        title
      }
    }
  } 
}
```

### Comments
```gql
{ 
  comments 
  { 
    id
    body
    post { title }
    user { username }
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
* https://aws.amazon.com/blogs/aws/new-auto-scaling-for-amazon-dynamodb/
* https://www.npmjs.com/package/dynamoose-to-cloudformation

## Backlog

- [x] Run Lambda & DynamoDB in Docker
- [x] Serve GraphQL server
- [x] Provide Dynamoose models in GraphQL context
- [x] Create sample data with faker.js
- [ ] Migrate Backlog to BACKLOG.md with epics
- [x] Create User, Post, and Comment resources
- [ ] Add testing and test coverage to server, types, schema, resolvers, and models
- [x] Add linting rules
- [ ] Tag project release versions
- [ ] Add create, edit, and delete Mutations
  - User
  - Post
  - Comment
- [ ] Add Mutation examples
  - Post
- [ ] Add GraphQL Query examples for posts, comments, and users
- [ ] Test and document AWS deployment
- [ ] Rewrite posts.user field as secondary index in YML config and Resolvers
  - User.posts to query posts.user index
  - User.comments to query comments.user index
  - Comments.user
  - Comments.post
  - getUserByEmail
- [ ] Enforce linting rules on git pre-commit hook
- [ ] rewrite Query.posts.scan() as dataLoader function
- [ ] Add query example for get comments by post
- [ ] Automatically restart (forever) DynamoDB in Docker
- [ ] Add created and updated timestamps to posts, comments, and users
- [ ] Implement GraphQL Connectors for request caching
- [ ] Implement pagination, limit, and offset
- [ ] Add totalCount example
- [ ] Add Winston logger
- [ ] apollo-server-cache-redis
- [ ] Add authentication
- [ ] Add `active` field as DynamoDB Index and GraphQL Query filter for posts, comments, and users
- [ ] Limit creation endpoints to authenticated users
- [ ] Limit edit & delete endpoints to admins and authors
- [ ] Set author information based on logged in user in Mutations
- [ ] Add Node traversal example
- [ ] Add find user by email example
- [ ] Configure autoscaling on AWS DynamoDB resources
- [ ] Add DOCKER.md documentation file
- [ ] Add client example
- [ ] Generate DynamoDB table cloudformation definitions from Dynamoose model
- [ ] Convert sample data to static JSON with generator npm script
- [ ] Document best practices for DynamoDB indices and lookup fields
- [ ] Breakup documentation into multiple files for setup, query examples, code explanation, extending, roadmap, and references
- [ ] Include greenkeeper.io

