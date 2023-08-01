// 

// export default {
//     "REGION": "us-east-1",
//     "USER_POOL_ID": "us-east-1_MsHyhUYSr",
//     "USER_POOL_APP_CLIENT_ID": "5cm5p1n8m11vvclk312lifshs1"
// }

import { CognitoAccessToken, CognitoIdToken, CognitoRefreshToken, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_MsHyhUYSr',
    ClientId: "5cm5p1n8m11vvclk312lifshs1"
};
   
const userPool = new CognitoUserPool(poolData);

export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser()

    if (!cognitoUser) {
      reject(new Error("No user found"))
      return
    }

    cognitoUser.getSession((err, session) => {
      if (err) {
        reject(err)
        return
      }
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err)
          return
        }
        const userData = attributes.reduce((acc, attribute) => {
          acc[attribute.Name] = attribute.Value
          return acc
        }, {})

        resolve({ ...userData, username: cognitoUser.username })
      })
    })
  })
}