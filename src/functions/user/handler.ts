import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '../../libs/api-gateway';
// import { middyfy } from '../../libs/lambda';
import { v4 } from "uuid";
import userService from "../../services/index"
// import dynamoDBClient from "../../model/index";
//  const userService = new UserService(dynamoDBClient());
export const getAllUsers = async (): Promise<APIGatewayProxyResult> => {

    try {
        const users = await userService.getAllUsers();
        console.log(users)
        return formatJSONResponse ({
            statusCode:200,
            users
        })
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message:e
        });
    }
}
export const createUser = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    try {
        const id = v4();
        const data=JSON.parse(event.body);
        const user = await userService.createUser({
            id: id,
            name:data.name,
            username:data.username,
            email:data.email,
            avatar:data.avatar,
            address:{
                street:data.address.street,
                suite:data.address.suite,
                city:data.address.city,
                zipcode:data.address.zipcode,
                
            },
            phone:data.phone,
            website:data.website,
            company:{
                name: data.company.name,
                catchPhrase: data.company.catchPhrase,  
            },
        })
       
        return formatJSONResponse({
            statusCode:200,
            user
        }
        );
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message:e
        });
    }
}
export const createMultipleUsers = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const data=JSON.parse(event.body);
        const users=data.map((user)=>{
            return {
                id: v4(),
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                address:{
                    street: user.address.street,
                    suite: user.address.suite,
                    city: user.address.city,
                    zipcode: user.address.zipcode,
                    
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
            statusCode:200,
                resUsers
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message:e
        });
    }

}
export const getUser=async (event: any): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const user = await userService.getUser(id);
        console.log('here');
        return formatJSONResponse({
            user, id
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message: e.message
        });
    }
}
export const getMultipleUsers=async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    try {
        const ids = event.multiValueQueryStringParameters.ids;

        const users = await userService.getUsersByIds(ids)
        return formatJSONResponse({
            users, ids
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message: e
        });
    }

}
export const updateUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const user =JSON.parse (event.body);
  
    try {
      const updatedUser = await userService.updateUser(id, user);
      return formatJSONResponse({
        updatedUser,
        id
      });
    } catch (e) {
      return formatJSONResponse({
        statusCode: 500,
        message: e
      });
    }
  };
  
export const deleteUser  = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const user = await userService.deleteUser(id)
        return formatJSONResponse({
            user, id
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message: e
        });
    }
}
export const deleteMultipleUsers = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const ids = event.multiValueQueryStringParameters.ids;
        const users = await userService.deleteMultipleUsers(ids)
        return formatJSONResponse({
            users, ids
        });
    } catch (e) {
        return formatJSONResponse({
            statusCode: 500,
            message: e
        });
    }

}