import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as sns from "@aws-cdk/aws-sns";
import * as snsSubs from "@aws-cdk/aws-sns-subscriptions";
import * as sqs from "@aws-cdk/aws-sqs";
import * as events from "@aws-cdk/aws-events";
import * as eventTargets from "@aws-cdk/aws-events-targets";

export class ServicesStack extends cdk.Stack {
  private readonly EVENT_SOURCE = "p14d";
  private readonly EVENT_DETAIL_TYPE = "lab-report";

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* ***************************************************************** */
    /* ***** API for putting events on the EventBridge default bus ***** */
    /* ***************************************************************** */
    const apigwRole = new iam.Role(this, "MYAPIGWRole", {
      assumedBy: new iam.ServicePrincipal("apigateway.amazonaws.com"),
    });
    apigwRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["events:PutEvents"],
        resources: [
          `arn:aws:events:${this.region}:${this.account}:event-bus/default`,
        ],
      })
    );

    const myRestAPI = new apigw.RestApi(this, "MyRestAPI");

    const options: apigw.IntegrationOptions = {
      credentialsRole: apigwRole,
      requestParameters: {
        "integration.request.header.X-Amz-Target": "'AWSEvents.PutEvents'",
        "integration.request.header.Content-Type":
          "'application/x-amz-json-1.1'",
      },
      requestTemplates: {
        "application/json": `{"Entries": [{"EventBusName": "default", "Source": "${this.EVENT_SOURCE}", "DetailType": "${this.EVENT_DETAIL_TYPE}", "Detail": "$util.escapeJavaScript($input.body)"}]}`,
      },
      integrationResponses: [
        {
          statusCode: "200",
          responseTemplates: { "application/json": "" },
        },
      ],
    };

    const eventBridgeInteg = new apigw.Integration({
      type: apigw.IntegrationType.AWS,
      uri: `arn:aws:apigateway:${cdk.Aws.REGION}:events:path//`,
      integrationHttpMethod: "POST",
      options,
    });

    myRestAPI.root.addCorsPreflight({
      allowOrigins: ["*"],
      allowMethods: ["POST"],
    });
    myRestAPI.root.addMethod("POST", eventBridgeInteg, {
      methodResponses: [{ statusCode: "200" }],
    });

    /* ***************************************************************************** */
    /* ***** SNS Topic which will listen to specific events on the default bus ***** */
    /* ***************************************************************************** */
    const labReportTopic = new sns.Topic(this, "P14dLabReportTopic", {
      topicName: "p14d-lab-report-topic",
    });

    const dlq = new sqs.Queue(this, "P14dDlq");

    labReportTopic.addSubscription(
      new snsSubs.EmailSubscription("miansharjeelsafdar@gmail.com", {
        deadLetterQueue: dlq,
      })
    );

    labReportTopic.addSubscription(
      new snsSubs.SmsSubscription("+923350171906", {
        deadLetterQueue: dlq,
      })
    );

    /* ********************************************** */
    /* ***** Event rule to envoke the SNS topic ***** */
    /* ********************************************** */
    new events.Rule(this, "P14dEventRule", {
      eventPattern: {
        source: [this.EVENT_SOURCE],
        detailType: [this.EVENT_DETAIL_TYPE],
      },
      targets: [new eventTargets.SnsTopic(labReportTopic)],
    });

    cdk.Tags.of(this).add("Project", "P14d-Pet-Theory-Event-Driven");
  }
}
