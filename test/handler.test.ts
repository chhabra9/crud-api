import { describe, it, expect,jest, beforeEach } from '@jest/globals';
 import UserService from '../src/services/index';
import { createMultipleUsers, createUser, deleteMultipleUsers, deleteUser, getAllUsers, getMultipleUsers, getUser ,updateUser} from '../src/functions/user/handler';
import { mockUser } from './mockFunctionAndType';
import * as uuid from 'uuid';
// import { mock } from 'node:test';
// import { mock } from 'node:test';
jest.mock('uuid');
describe('getUser', () => {
  const mockEvent: any = {
    pathParameters: { id: '123' },
  };

  const mockResponse: any = {
    statusCode: 200,
    body: JSON.stringify({user:{ name: 'achint', address:'avb' }, id:'123'}),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the getUser method and return the expected response', async () => {
    const mockGetUser=jest.spyOn(UserService,'getUser');
    mockGetUser.mockResolvedValue({name:'achint',address:'avb'});
    const user=await getUser(mockEvent);
    expect( mockGetUser).toHaveBeenCalledTimes(1);
    expect(mockGetUser).toHaveBeenCalledWith('123');
    expect(user).toEqual(mockResponse);
  });
  it('should return 500 when getUser method throws an error', async () => {
    const mockGetUser=jest.spyOn(UserService,'getUser');
    mockGetUser.mockRejectedValue(new Error('error'));
    const user=await getUser(mockEvent);
    console.log(user);
    expect(JSON.parse(user.body).statusCode).toEqual(500);
    expect(user.body).toEqual(JSON.stringify({ statusCode:500,message: 'error' }));
    expect(mockGetUser).toHaveBeenCalledTimes(1);
  })
});
describe('createUser', () => {

  const mockEvent: any = {
    body: JSON.stringify(mockUser),
  }
  const mockCreateUser=jest.spyOn(UserService,'createUser');
  const uuidSpy = jest.spyOn(uuid, 'v4');
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should call the createUser method and return the expected response', async () => {
    uuidSpy.mockReturnValue('1');
    mockCreateUser.mockResolvedValue(mockUser);
    await createUser(mockEvent);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toHaveBeenCalledWith(mockUser);
    expect(mockCreateUser).toHaveReturned();
  
  })
  it('should return a response with status code 500 when createUser method throws an error', async () => {
    uuidSpy.mockReturnValue('1');
    mockCreateUser.mockRejectedValue(new Error('error'));
    const user=await createUser(mockEvent);
    expect(JSON.parse(user.body).statusCode).toEqual(500);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toHaveBeenCalledWith(mockUser);
  })
}
)
describe('updateUser', () => {
  const mockUpdateUser=jest.spyOn(UserService,'updateUser');
  const mockEvent: any = {
    pathParameters: { id: '1' },
    body: JSON.stringify({name:"raju",userName:"raju123"}),
  } ;
  beforeEach(() => {
    jest.clearAllMocks();
  });
   it('should call the updateUser method and return the expected response',async () => {
      mockUpdateUser.mockResolvedValue(mockUser);
      await updateUser(mockEvent);
      expect(mockUpdateUser).toHaveBeenCalledTimes(1);
      expect(mockUpdateUser).toHaveBeenCalledWith('1',JSON.parse(mockEvent.body));
      expect(mockUpdateUser).toHaveReturned();
  })
  it('should return a response with status code 500 when updateUser method throws an error', async() => {
    mockUpdateUser.mockRejectedValue(new Error('error'));
     const user=await updateUser(mockEvent);
    expect (JSON.parse(user.body).statusCode).toEqual(500);
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
  })
})
describe('deleteUser', () => {
  const mockDeleteUser=jest.spyOn(UserService,'deleteUser');
  const mockEvent: any = {
    pathParameters: { id: '1' },
  } ;
  beforeEach(() => {
    jest.clearAllMocks();
  });
   it('should call the updateUser method and return the expected response',async () => {
      mockDeleteUser.mockResolvedValue(mockUser);
      await deleteUser(mockEvent);
      expect(mockDeleteUser).toHaveBeenCalledTimes(1);
      expect(mockDeleteUser).toHaveBeenCalledWith('1');
      expect(mockDeleteUser).toHaveReturned();
  })
  it('should return a response with status code 500 when updateUser method throws an error', async() => {
    mockDeleteUser.mockRejectedValue(new Error('error'));
     const user=await deleteUser(mockEvent);
     console.log(user);
    expect (JSON.parse(user.body).statusCode).toEqual(500);
    expect(mockDeleteUser).toHaveBeenCalledTimes(1);
  })
})
describe('getMultipleUser', () => {
  const mockGetAllUsers=jest.spyOn(UserService,'getAllUsers')
  beforeEach(() => {
    jest.clearAllMocks();
  });
   it('should call the updateUser method and return the expected response',async () => {
      mockGetAllUsers.mockResolvedValue([mockUser,mockUser]);
     await getAllUsers(); 
      expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
      expect(mockGetAllUsers).toHaveReturned();
  })
  it('should return a response with status code 500 when updateUser method throws an error', async() => {
    mockGetAllUsers.mockRejectedValue(new Error('error'));
     const user=await getAllUsers();
    expect (JSON.parse(user.body).statusCode).toEqual(500);
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
  })
})
describe('createMultipleUser', () => {

  const mockEvent: any = {
    body: JSON.stringify([mockUser,mockUser,mockUser]),
  }
  const mockCreateMultipleUser=jest.spyOn(UserService,'createMultipleUsers');
  const uuidSpy = jest.spyOn(uuid, 'v4');
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should call the createUser method and return the expected response', async () => {
    uuidSpy.mockReturnValue('1');
    mockCreateMultipleUser.mockResolvedValue([mockUser,mockUser,mockUser]);
    await createMultipleUsers(mockEvent);
    expect(mockCreateMultipleUser).toHaveBeenCalledTimes(1);
    expect(mockCreateMultipleUser).toHaveBeenCalledWith([mockUser,mockUser,mockUser]);
    expect(mockCreateMultipleUser).toHaveReturned();
  
  })
  it('should return 500 when createUser method throws an error', async () => {
    uuidSpy.mockReturnValue('1');
    mockCreateMultipleUser.mockRejectedValue(new Error('error'));
    const users=await createMultipleUsers(mockEvent);
    expect(JSON.parse(users.body).statusCode).toBe(500);
    expect(mockCreateMultipleUser).toHaveBeenCalledTimes(1);
    expect(mockCreateMultipleUser).toHaveBeenCalledWith([mockUser,mockUser,mockUser]);
    expect(mockCreateMultipleUser).toHaveReturned();
  
  })
})
describe('getMultipleUser', () => {

  const mockEvent: any = {
    multiValueQueryStringParameters: { ids: ['1','2','3'] },
  }
  const mockGetMultipleUsers=jest.spyOn(UserService,'getUsersByIds');
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should call the createUser method and return the expected response', async () => {
    mockGetMultipleUsers.mockResolvedValue([mockUser,mockUser,mockUser]);
    const users=await getMultipleUsers(mockEvent);
    expect(mockGetMultipleUsers).toHaveBeenCalledTimes(1);
    expect(mockGetMultipleUsers).toHaveBeenCalledWith(['1','2','3']);
    expect(JSON.parse(users.body)).toEqual({users: [mockUser, mockUser, mockUser],ids: ['1', '2', '3'],});    
    expect(mockGetMultipleUsers).toHaveReturned();
  
  })
  it('should return 500 when createUser method throws an error', async () => {
    mockGetMultipleUsers.mockRejectedValue( new Error('error'));
    const users=await getMultipleUsers(mockEvent);
    expect(JSON.parse(users.body).statusCode).toBe(500);
    expect(mockGetMultipleUsers).toHaveBeenCalledTimes(1);
    expect(mockGetMultipleUsers).toHaveBeenCalledWith(['1','2','3']);
  
  })
})
describe('deleteMultipeUser', () => {
  const mockDeleteMultipeUser=jest.spyOn(UserService,'deleteMultipleUsers');
  const mockEvent: any = {
    multiValueQueryStringParameters: { ids: ['1','2','3'] },
  } ;
  beforeEach(() => {
    jest.clearAllMocks();
  });
   it('should call the updateUser method and return the expected response',async () => {
    mockDeleteMultipeUser.mockResolvedValue(mockUser);
      await deleteMultipleUsers(mockEvent);
      expect(mockDeleteMultipeUser).toHaveBeenCalledTimes(1);
      expect(mockDeleteMultipeUser).toHaveBeenCalledWith(['1','2','3']);
      expect(mockDeleteMultipeUser).toHaveReturned();
  })
  it('should return a response with status code 500 when updateUser method throws an error', async() => {
    mockDeleteMultipeUser.mockRejectedValue(new Error('error'));
     const user=await deleteMultipleUsers(mockEvent);
     console.log(user);
    expect (JSON.parse(user.body).statusCode).toEqual(500);
    expect(mockDeleteMultipeUser).toHaveBeenCalledTimes(1);
  })
})