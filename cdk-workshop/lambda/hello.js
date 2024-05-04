import { promises as fsPromises } from 'fs';
import * as AWS from 'aws-sdk';

exports.handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));
    const bucketName = process.env.bucketName || '';
    const objectKey = 'output-file.txt';
    const filePath = `/tmp/${objectKey}`;
  
    await fsPromises.writeFile(filePath, 'Contents from Lambda to local file');
    const fileContents = await fsPromises.readFile(filePath);
  
    const s3 = new AWS.S3();
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: fileContents,
    };
    await s3.upload(params).promise();

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `Hello, CDK! You've hit ${event.path}\n`
    };
  };