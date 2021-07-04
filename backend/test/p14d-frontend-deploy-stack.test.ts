import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { FrontendDeployStack } from "../lib/p14d-frontend-deploy-stack";

const createTestStack = (app: cdk.App) =>
  new FrontendDeployStack(app, "MyTestStack");

test("Stack has a S3 Bucket", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(haveResource("AWS::S3::Bucket"));
});

test("Stack has a CloudFront Distribution", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(haveResource("AWS::CloudFront::Distribution"));
});
