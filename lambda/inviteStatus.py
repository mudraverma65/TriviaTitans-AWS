import boto3

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # Extract input parameters from the event
    emailID = event['emailID']
    teamname = event['teamname']
    status = event['status']

    # Validate input parameters
    if not emailID or not teamname:
        return {
            'statusCode': 400,
            'body': 'emailID and teamname are required parameters'
        }

    # Create a DynamoDB table resource
    teamTable = dynamodb.Table('Team')
    userTable = dynamodb.Table('User')

    try:
        # If status is "confirm", update the members set in the DynamoDB table
        if status == 'confirm':
            # Get the current members set for the team
            response = teamTable.get_item(
                Key={
                    'teamname': teamname
                }
            )
            item = response.get('Item')
            current_members = set(item.get('members', []))
            
            # Add the emailID to the members set
            current_members.add(emailID)
            
            # Update the members set in the DynamoDB table
            teamTable.update_item(
                Key={
                    'teamname': teamname
                },
                UpdateExpression='SET members = :members',
                ExpressionAttributeValues={
                    ':members': current_members
                }
            )
            
            userTable.update_item(
            Key={
                'emailID': emailID,
                'teamname': teamname
            },
            UpdateExpression='SET #tn = :teamname, #st = :status',
            ExpressionAttributeNames={
                '#tn': 'teamname',
                '#st': 'status'
            },
            ExpressionAttributeValues={
                ':teamname': teamname,
                ':status': status
            }
        )

        return {
            'statusCode': 200,
            'body': 'Update successful'
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': f'Failed to update the DynamoDB table: {str(e)}'
        }
