import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { ServicesStack } from "../lib/p14d-backend-services-stack";

const createTestStack = (app: cdk.App) => new ServicesStack(app, "MyTestStack");

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
