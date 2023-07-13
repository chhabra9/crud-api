import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import userService from "src/service/index";

export const getAllUsers = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const users = await userService.getAllUsers();
    return formatJSONResponse ({
        users
    })
})
export const createUser = middyfy(async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    try {
        const id = v4();
        
        const user = await userService.createUser({
            id: id,
            name: event.body.name,
            username: event.body.username,
            email: event.body.email,
            avatar: event.body.avatar,
            address:{
                street: event.body.street,
                suite: event.body.suite,
                city: event.body.city,
                zipcode: event.body.zipcode,
                
            },
            phone: event.body.phone,
            website: event.body.website,
            company:{
                name: event.body.company.name,
                catchPhrase: event.body.company.catchPhrase,  
            },
        })
        return formatJSONResponse({
            user
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message:event.body
        });
    }
})
export const createMultipleUsers = middyfy(async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const users=event.body.map((user)=>{
            return {
                id: v4(),
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                address:{
                    street: user.street,
                    suite: user.suite,
                    city: user.city,
                    zipcode: user.zipcode,
                    
                },
                phone: user.phone,
                website: user.website,
                company:{
                    name: user.company.name,
                    catchPhrase: user.company.catchPhrase,  
                },
            }
        
        })
        const resUsers = await userService.createMultipleUsers(users);
        return formatJSONResponse({
                resUsers
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message:e
        });
    }

})
export const getUser= middyfy(async (event: any,context:any): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const user = await userService.getUser(id)
        return formatJSONResponse({
            user, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})
export const getMultipleUsers=middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const ids = event.multiValueQueryStringParameters.ids;

    try {
        const users = await userService.getUsersByIds(ids)
        return formatJSONResponse({
            users, ids
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: ids
        });
    }

})
export const updateUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const user = event.body;
  
    try {
      const updatedUser = await userService.updateUser(id, user);
      return formatJSONResponse({
        updatedUser,
        id
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return formatJSONResponse({
        status: 500,
        message: 'Failed to update user'
      });
    }
  });
  
export const deleteUser  = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const user = await userService.deleteUser(id)
        return formatJSONResponse({
            user, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})
export const deleteMultipleUsers = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const ids = event.multiValueQueryStringParameters.ids;
    try {
        const users = await userService.deleteMultipleUsers(ids)
        return formatJSONResponse({
            users, ids
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }

})