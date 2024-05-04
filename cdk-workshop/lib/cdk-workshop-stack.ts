import {  Stack, StackProps,App } from 'aws-cdk-lib';
import { Runtime,Code, Function } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

export class CdkWorkshopStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    const hello = new Function(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset('lambda'),
      handler: 'hello.handler'
    });
    new LambdaRestApi(this, 'Endpoint', {
      handler: hello
    });
  }
}
