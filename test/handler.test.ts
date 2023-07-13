import UserService from "../src/service/service";
import {expect, jest, describe,it} from '@jest/globals';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
const userService=new UserService(new DocumentClient());
jest.mock("../src/service/service",()=>{
    return {
        getUser:jest.fn()
    }
});
// import {getUser} from "../src/functions/user/handler";
// import { APIGatewayProxyEvent } from "aws-lambda";

describe('get user',()=>{

    it('should return a get user when getUserCalled',async ()=>{
        const mockGetUser=userService.getUser as jest.MockedFunction<typeof userService.getUser>;
        mockGetUser.mockResolvedValue({name:'abc',id:'1'});
        // const result=await getUser(mockEvent,context);
        expect(mockGetUser).toHaveBeenCalledTimes(1);
    
})})

