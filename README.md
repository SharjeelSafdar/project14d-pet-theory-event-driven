<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Project 14D: Pet Theory App for Lab Reports with Event-Driven Architecture
</h1>

## Link to Web App

A serverless JAMstack App with Gatsby, TypeScript, ApiGateway, EventBridge, SNS, and CloudFront. The web app has been deployed to AWS CloudFront, and can be accessed [here](https://dv0uvvryjj7u9.cloudfront.net/).

## Frontend

The following are some of the features of this project:

- An HTML form to submit a dummy lab report of an animal
- Lab report is submitted through an [API Gateway](https://aws.amazon.com/api-gateway/) endpoint.
- The API Gateway puts the lab report data in the form of an event on the [EventBridge](https://aws.amazon.com/eventbridge/) default bus.
- EventBridge publishes a message on an [SNS](https://aws.amazon.com/sns/) topic.
- SNS sends the message to an email subscriber and a phone number subscriber.
- Bootstrapped with [GatsbyJS](https://www.gatsbyjs.com/)
- Additionally, includes TypeScript support for gatsby-config, gatsby-node, gatsby-browser and gatsby-ssr files.
- Site hosted on [AWS CloudFront](https://aws.amazon.com/cloudfront/).
- CI/CD with [GitHub Actions](https://docs.github.com/en/actions)
- Completely typed with [TypeScript](https://www.typescriptlang.org/)

## Backend

This AWS CDK App deploys the backend infrastructure for Project 14D. The app consists of two stacks.

### Stack 1: API Gateway API, EventBridge and SNS

It contanis the AWS services for delivering the lab report. It has the following constructs:

- An API Gateway Rest API with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled which puts the lab report data as an event on EventBridge default bus
- An EventBridge rule to publish a message (containing the lab report data) on an SNS topic
- An email and a phone number subscribers to the SNS topic

<p align="center">
  <img alt="Architecture Diagram" src="./backend/P14d AWS Architecture.jpg" />
</p>

### Stack 2: CloudFront Distribution and S3 Bucket

It contains the infrastructure to deploy frontend client. It has the following constructs:

- A [S3](https://aws.amazon.com/s3/) Bucket with public access to store the static assets of Gatsby web app
- A Cloud Front Distribution to serve the static assets through a CDN. It also has the error handling capability: redirects any `404s` to `/404.html`.

<p align="center">
  <img alt="Architecture Diagram" src="./backend/CloudFront Distribution Stack.jpg" />
</p>
