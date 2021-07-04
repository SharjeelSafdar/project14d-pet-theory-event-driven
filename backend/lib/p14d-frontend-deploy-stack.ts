import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";

export class FrontendDeployStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketForFrontendAssets = new s3.Bucket(
      this,
      "P14dBucketForFrontendAssets",
      {
        bucketName: "p14d-bucket-for-frontend-assets",
        versioned: true,
        autoDeleteObjects: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        websiteIndexDocument: "index.html",
        publicReadAccess: true,
      }
    );

    const distribution = new cloudfront.Distribution(this, "P14dFrontendDist", {
      defaultBehavior: {
        origin: new origins.S3Origin(bucketForFrontendAssets),
      },
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: "/404.html",
        },
      ],
    });

    new cdk.CfnOutput(this, "CloudFrontUrl", {
      value: distribution.domainName,
    });

    cdk.Tags.of(this).add("Project", "P14d-Pet-Theory-Event-Driven");
  }
}
