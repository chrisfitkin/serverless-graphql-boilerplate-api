<!--
title: GraphQL query endpoint in NodeJS on AWS with DynamoDB
description: A single-module GraphQL endpoint with query and mutation functionality.
layout: Doc
-->

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
# Example GraphQL Query
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
```

Apollo Playground: http://localhost:3000/graphql
DynamoDB: http://localhost:8000/shell

Seed data: `./.seed/[resource].json`

---

## Deployment

---

## Explore the code

### GraphQL Serverless Handler

```js
// src/server.js
```

### GraphQL Schema

```js
// src/graphql/schema.js
```

### GraphQL `Post` type

```js
// src/graphql/types/post.js
```

### Dynamoose `Post` Model

```js
// src/models/Post.js
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

---

## Dependencies

* Apollo Server
* Serverless Framework
* Dynamoose
* dotenv
* fakerjs

---

## References

The following resources were used in part to develop this project.

* https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
* https://itnext.io/graphql-mongoose-a-design-first-approach-d97b7f0c869 # Model.populate

