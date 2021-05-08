import * as uuid from "uuid";
import handler from "../../../libs/handler-lib";
import dynamoDb from "../../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const { crush_name, crush_email, content } = event.body;

  const params = {
    TableName: process.env.messageTableName,
    Item: {
      id: uuid.v4(),
      user_id: event.requestContext.identity.cognitoIdentityId,
      crush_name,
      crush_email,
      content,
      created_at: Date.now(),
    },
  };
  await dynamoDb.put(params);

  return params.Item;
});
