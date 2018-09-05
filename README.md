
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

- Epic 1: GraphQL in Docker
  - [x] Run Lambda & DynamoDB in Docker
  - [x] Serve GraphQL server
  - [x] Provide Dynamoose models in GraphQL context
  - [x] Create sample data with faker.js
  - [ ] Migrate Backlog to BACKLOG.md with epics
  - [x] Create User, Post, and Comment resources
  - [ ] Tag & enforce project release versions
  - [ ] Add GraphQL Query examples for posts, comments, and users
- Epic 2: Testing
  - [ ] Add testing and test coverage to server, types, schema, resolvers, and models
  - [x] Add linting rules
  - [ ] Enforce linting rules on git pre-commit hook
- Epic 3: Extend Query & Mutation functions
  - [ ] Add create, edit, and delete Mutations
    - [ ] User
    - [ ] Post
    - [ ] Comment
  - [ ] Add Mutation examples for Posts
  - [ ] Implement pagination, limit, and offset
  - [ ] Add totalCount example
- Epic 3: Deployment
  - [ ] Test AWS deployment 
  - [ ] document AWS deployment
  - [ ] Provide CI example
  - [ ] Enforce testing in CI
  - [ ] Configure autoscaling on AWS DynamoDB resources
- Epic 4: Performance
  - [x] Rewrite Model.get functions using DataLoders
  - [ ] Rewrite posts.user field as secondary index in YML config and Resolvers
    - [ ]User.posts to query posts.user index
    - [ ]User.comments to query comments.user index
    - [ ]Comments.user
    - [ ]Comments.post
    - [ ]getUserByEmail
  - [ ] Rewrite Query.posts.scan() as DataLoader function
  - [ ] Implement apollo-server-cache-redis locally with docker-compose
  - [ ] Setup AWS redis server deployment
- Epic 5: Extend models & data
  - [ ] Add created and updated timestamps to posts, comments, and users
  - [ ] Populate created and updated fields automatically
  - [ ] Add `active` field as DynamoDB Index and GraphQL Query argument for posts, comments, and users
- Epic 6: Authentication & Authorization
  - [ ] Add authentication functions
  - [ ] Use JWT (JSON Web Tocken) with Bearer auth
  - [ ] Automatically add user to GraphQL context
  - [ ] Use ACL config file in GraphQL context
    - [ ] Configure allow/deny functions by role or authenticated boolean
    - [ ] Limit create comment and post enpdoints to authenticated users
    - [ ] Configure admin/owner function limitations
      - [ ] Edit own Post, Comment
      - [ ] Delete own Post, Comment
      - [ ] Delete user (admin only)
    - [ ] Allow public functions without authentication
  - [ ] Separate public and private redis cache
  - [ ] Automatically save createdBy & updatedBy user values
- Epic 7: Developer Experience
  - [ ] Convert sample data to static JSON with generator npm script
  - [ ] Automatically restart (forever) DynamoDB in Docker
  - [ ] Generate DynamoDB table cloudformation definitions from Dynamoose model
  - [ ] Include greenkeeper.io
  - [ ] Add Winston logger
- Epic 8: Documentation
  - [ ] Add query example for get comments by post
  - [ ] Breakup documentation into multiple files for setup, query examples, code explanation, extending, roadmap, and references
  - [ ] Add Node traversal example
  - [ ] Add find user by email example
  - [ ] Document best practices for DynamoDB indices and lookup fields
  - [ ] Complete explore code section
  - [ ] Add create and get(id) examples to getting started
  - [ ] Add DOCKER.md documentation file
- Epic 9: Admin client
  - [ ] Migrate `src` code to `src/server`
  - [ ] Run React Admin in docker locally
  - [ ] Allow local config for remote endpoint hostname
  - [ ] Connect to GraphQL API
  - [ ] Implement authentication
  - [ ] Post CRUD
  - [ ] User CRUD
  - [ ] Comment CRUD
  - [ ] Limit lists and functions by authorized roles
  - [ ] Create deployment example
  - [ ] Document deployment using S3 hosting & Route53

