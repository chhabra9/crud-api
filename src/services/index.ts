import dynamoDBClient from "../model/index";
import UserService from "./service";
const userService = new UserService(dynamoDBClient());
export default userService;