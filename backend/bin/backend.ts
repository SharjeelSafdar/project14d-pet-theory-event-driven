#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ServicesStack } from "../lib/p14d-backend-services-stack";
import { FrontendDeployStack } from "../lib/p14d-frontend-deploy-stack";

const app = new cdk.App();
new ServicesStack(app, "P14dBackendServicesStack");
new FrontendDeployStack(app, "P14dFrontendDeployStack");
