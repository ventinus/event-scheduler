export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "schedulerb0a962c9": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "HostedUIDomain": "string",
            "OAuthMetadata": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "ManagersGroupRole": "string"
        }
    },
    "api": {
        "scheduler": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "storage": {
        "mendelssohnsAssets": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}