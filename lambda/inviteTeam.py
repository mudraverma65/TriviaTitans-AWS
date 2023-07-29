import boto3

def lambda_handler(event, context):
    recipients = event.get('recipients', [])
    team_name = event.get('team_name', '')

    # Replace with your actual SNS topic ARN
    topic_arn = 'arn:aws:sns:us-east-1:831294309591:inviteTeam'

    sns = boto3.client('sns')

    for email in recipients:
        # Construct the message body for each recipient
        message_body = f"Email: {email}"

        # Publish the message to the SNS topic with the recipient's email ID as the message attribute
        response = sns.publish(
            TopicArn=topic_arn,
            Message=message_body,
            Subject='testtt',  # Replace with your desired subject
            MessageAttributes={
                'emailID': {
                    'DataType': 'String',
                    'StringValue': email
                }
            }
        )

    return {
        'statusCode': 200,
        'body': 'Messages published successfully'
    }
