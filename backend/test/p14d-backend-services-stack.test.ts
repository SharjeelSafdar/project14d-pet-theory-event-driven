import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { ServicesStack } from "../lib/p14d-backend-services-stack";

const createTestStack = (app: cdk.App) => new ServicesStack(app, "MyTestStack");

test("Stack has an IAM Role for API Gateway Service", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::IAM::Role", {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: "sts:AssumeRole",
            Effect: "Allow",
            Principal: {
              Service: "apigateway.amazonaws.com",
            },
          },
        ],
        Version: "2012-10-17",
      },
    })
  );
});

test("Stack has an IAM Policy for ApiGateway to put events on default bus", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::IAM::Policy", {
      PolicyDocument: {
        Statement: [
          {
            Action: "events:PutEvents",
            Effect: "Allow",
            Resource: {
              "Fn::Join": [
                "",
                [
                  "arn:aws:events:",
                  {
                    Ref: "AWS::Region",
                  },
                  ":",
                  {
                    Ref: "AWS::AccountId",
                  },
                  ":event-bus/default",
                ],
              ],
            },
          },
        ],
        Version: "2012-10-17",
      },
    })
  );
});

test("Stack has an ApiGateway REST Api", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi"));
});

test("Stack has an SNS Topic", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::SNS::Topic", {
      TopicName: "p14d-lab-report-topic",
    })
  );
});

test("Stack has an Email Subscription to the SNS Topic", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::SNS::Subscription", {
      Protocol: "email",
      Endpoint: "miansharjeelsafdar@gmail.com",
    })
  );
});

test("Stack has an SMS Subscription to the SNS Topic", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::SNS::Subscription", {
      Protocol: "sms",
      Endpoint: "+923350171906",
    })
  );
});

test("Stack has an SQS Queue as a Dead Letter Queue", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(haveResource("AWS::SQS::Queue"));
});

test("Stack has an Event Rule to Envoke SNS", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::Events::Rule", {
      EventPattern: {
        source: ["p14d"],
        "detail-type": ["lab-report"],
      },
    })
  );
});
