<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Project 14D: Pet Theory App for Lab Reports with Event-Driven Architecture
</h1>

## Link to Web App

A serverless JAMstack App with Gatsby, TypeScript, AppSync, DynamoDB, Lambda, CloudFront, and EventBridge. The web app has been deployed to AWS CloudFront, and can be accessed [here](https://d3upvsnwdc4gy5.cloudfront.net).

## Frontend

The following are some of the features of this project:

- A dashboard for a user to manage his/her bookmarks
- Possible interactions with bookmarks: create a new bookmark, update an existing bookmark, delete a bookmark and batch delete existing bookmarks
- A [DynamoDB](https://aws.amazon.com/dynamodb/) table to store bookmarks
- A GraphQL API with [AWS AppSync](https://aws.amazon.com/appsync/) to interact with DynamoDB
- Demonstrates CRUD operations using DynamoDB through the GraphQL API
- Bookmarks are updated in real-time on any instance of web app with the help of AppSync subscriptions
- The AppSync queries are performed synchronously with a DynamoDB data source.
- The AppSync mutations are performed assynchronously. An HTTP data source simply puts the information about the mutation on [EventBridge](https://aws.amazon.com/eventbridge/) default bus.
- EventBridge invokes a [Lambda](https://aws.amazon.com/lambda/) function which performs the actual mutation on the DynamoDB Table with the help of `aws-sdk`.
- DynamoDB Streams are also enabled for our table. Any change in the table invokes another Lambda function which calls a mutation on AppSync called `mutationCompleted`.
- The client listens for this mutation with an AppSync subscription called `onMutationCompleted` and updates the UI.
- Uses [Amplify](https://amplify.com/) for GraphQL queries and mutations on client side
- Bootstrapped with [GatsbyJS](https://www.gatsbyjs.com/)
- Additionally, includes TypeScript support for gatsby-config, gatsby-node, gatsby-browser and gatsby-ssr files
- Site hosted on [AWS CloudFront](https://aws.amazon.com/cloudfront/)
- CI/CD with [GitHub Actions](https://docs.github.com/en/actions)
- Completely typed with [TypeScript](https://www.typescriptlang.org/)
- Completely interactive and responsive design with [Material-UI](https://material-ui.com/) components.

## Backend

This AWS CDK App deploys the backend infrastructure for Project 14B. The app consists of two stacks.

### Stack 1: AppSync GraphQL API, DynamoDB Table, EventBridge and Lambda Functions

It contanis the AWS services used by the web client. It has the following constructs:

- A DynamoDB Table to contain the bookmarks saved by the users
- An AppSync GraphQL API to access the bookmarks in the Table
- A Lamba function to perform the actual mutation on the DynamoDB table
- An EventBridge rule to invoke this function when a mutation is performed by the client side
- Another Lambda function to call an AppSync mutation to inform the client side about the changes in table through an AppSync subscription

### Stack 2: CloudFront Distribution and S3 Bucket

It contains the infrastructure to deploy frontend client. It has the following constructs:

- A [S3](https://aws.amazon.com/s3/) Bucket with public access to store the static assets of Gatsby web app
- A Cloud Front Distribution to serve the static assets through a CDN. It also has the error handling capability: redirects any `404s` to `/404.html`.
