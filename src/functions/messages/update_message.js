import handler from "../../../libs/handler-lib";
import dynamoDb from "../../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.messageTableName,
    Key: {
      user_id: event.pathParameters.user_id,
      id: event.pathParameters.id,
    },
    UpdateExpression: "SET is_match = :is_match",
    ExpressionAttributeValues: {
      ":is_match": true,
    },
    ReturnValues: "ALL_NEW",
  };
  await dynamoDb.update(params);

  return { status: true };
});
