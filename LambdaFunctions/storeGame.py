import boto3

# Set the region for DynamoDB
dynamodb = boto3.resource('dynamodb') 
table_name = 'Team'  # Replace 'Team' with the actual name of your DynamoDB table

def lambda_handler(event, context):
    try:
        # Get the team name and game ID from the event
        teamname = event['teamname']
        gameID = event['gameID']

        # Check if the team name exists in the DynamoDB table
        team_details = get_team_details(teamname)
        if not team_details:
            return {
                'statusCode': 404,
                'body':'Team not found.'
            }

        # Update the game ID attribute in the DynamoDB table
        updated_team_details = update_game_id(teamname, gameID)
        if not updated_team_details:
            return {
                'statusCode': 500,
                'body': 'Failed to update game ID.'
            }

        return {
            'statusCode': 200,
            'body': 'Game ID updated successfully.'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': 'Internal server error.'
        }

def get_team_details(teamname):
    table = dynamodb.Table(table_name)
    response = table.get_item(Key={'TeamName': teamname})
    return response.get('Item')

def update_game_id(teamname, gameID):
    table = dynamodb.Table(table_name)
    response = table.update_item(
        Key={'TeamName': teamname},
        UpdateExpression='SET game_id = :gameIdValue',
        ExpressionAttributeValues={':gameIdValue': gameID},
        ReturnValues='ALL_NEW'
    )
    return response.get('Attributes')
