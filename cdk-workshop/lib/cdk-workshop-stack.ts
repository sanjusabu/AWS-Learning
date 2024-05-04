import {  Stack, StackProps,App,aws_s3, RemovalPolicy } from 'aws-cdk-lib';
import { Runtime,Code, Function } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

export class CdkWorkshopStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    const bucketId = "23bfe85n93n93n2345"
    const bucket = new aws_s3.Bucket(this, 'S3Bucket', {
      bucketName: `aws-lambda-s3-${bucketId}`,
      removalPolicy: RemovalPolicy.RETAIN,
    }
  )

    const hello = new Function(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset('lambda'),
      handler: 'hello.handler',
      environment : {
        bucketName: bucket.bucketName,
      }
    });
    new LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });
    
    bucket.grantReadWrite(hello)
  }
}
