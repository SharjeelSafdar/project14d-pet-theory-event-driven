import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { FrontendDeployStack } from "../lib/p14d-frontend-deploy-stack";

const createTestStack = (app: cdk.App) =>
  new FrontendDeployStack(app, "MyTestStack");

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = createTestStack(app);
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
