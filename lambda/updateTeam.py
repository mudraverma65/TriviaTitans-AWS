import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Team')

def lambda_handler(event, context):
    try:
        teamname = event['teamname']
        admin = event['admin']
        members = event['members']
        
        response = table.get_item(
            Key={
                'TeamName': teamname
            }
        )
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': {'error': 'Team not found.'}
            }

        # Update the item in DynamoDB
        response = table.update_item(
            Key={
                'TeamName': teamname
            },
            UpdateExpression='SET #adminAttr = :adminValue, #membersAttr = :membersValue',
            ExpressionAttributeNames={
                '#adminAttr': 'Admin',
                '#membersAttr': 'Members'
            },
            ExpressionAttributeValues={
                ':adminValue': admin,
                ':membersValue': members
            },
            ReturnValues='ALL_NEW'  # Return the updated attributes of the item
        )

        # Return the updated item
        return {
            'statusCode': 200,
            'body': response['Attributes']
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': {'error': 'Failed to update the item.'}
        }
