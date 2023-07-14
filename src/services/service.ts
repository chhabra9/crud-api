import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { User } from "../model/User";

export default class UserService {
  private Tablename: string = "UsersTable";

  constructor(private docClient: DocumentClient) {}
  async getAllUsers(): Promise<User[]> {
    const users = await this.docClient
      .scan({
        TableName: this.Tablename,
      })
      .promise();
    return users.Items as User[];
  }
  async createUser(user: User): Promise<User> {
    await this.docClient
      .put({
        TableName: this.Tablename,
        Item: user,
      })
      .promise();
    return user as User;
  }
  async createMultipleUsers(users: User[]): Promise<User[]>  {
    const putRequests = users.map(user => ({
      PutRequest: {
        Item: user,
      },
    }));
    await this.docClient.batchWrite({
      RequestItems:{
        UsersTable: putRequests
      }
    }).promise()
    return users as User[];
  }
 
  async getUser(id: string): Promise<any> {
    console.log("here");;
    try{
    const user = await this.docClient
      .get({
        TableName: this.Tablename,
        Key: {
          id: id,
        },
      })
      .promise();
    return user.Item as User;
  }catch(e){
    throw new Error(e.message);
  }
  }
  async getUsersByIds(ids: string[]): Promise<User[]> {
   try{ const users = await this.docClient
      .batchGet({
        RequestItems: {
          UsersTable: {
            Keys: ids.map(id => ({ id: id })),
          },
        },
      })
      .promise();
    return users.Responses.UsersTable as User[];}
    catch(e){
      throw new Error(e.message);
    
    }
  
  }
  async updateUser(id: string, user:Partial<User>): Promise<User> {
    const updateExpressionParts = [];
    const expressionAttributeValues = {};
  
    Object.keys(user).forEach((fieldName, index) => {
      const placeholder = `:value${index}`;
      updateExpressionParts.push(`#${fieldName} = ${placeholder}`);
      expressionAttributeValues[placeholder] = user[fieldName];
    });
  
    const updateExpression = `SET ${updateExpressionParts.join(', ')}`;
  
    const expressionAttributeNames = Object.keys(user).reduce((attributeNames, fieldName) => {
      attributeNames[`#${fieldName}`] = fieldName;
      return attributeNames;
    }, {});
  
    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.Tablename,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };
  
    try {
      const updated = await this.docClient.update(params).promise();
      return updated.Attributes as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }
  
  async deleteUser(id: string): Promise<any> {
    return await this.docClient
      .delete({
        TableName: this.Tablename,
        Key: {
          id: id,
        },
      })
      .promise();
  }
  async deleteMultipleUsers(ids: string[]): Promise<any> {
    const deleteRequests = ids.map(id => ({
      DeleteRequest: {
        Key: {
          id: id,
        },
      },
    }));
   return await this.docClient.batchWrite({
      RequestItems:{
        UsersTable: deleteRequests
      }
    }).promise();
  }

}
