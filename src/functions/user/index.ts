import { handlerPath } from '@libs/handler-resolver';
export const getAllUsers= {
    handler: `${handlerPath(__dirname)}/handler.getAllUsers`,
    events: [
        {
            http: {
                method: 'get',
                path: 'api/',
            },
        },
    ],
};

export const createUser = {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
        {
            http: {
                method: 'post',
                path: 'api/',
            },
        },
    ],
};
export const createMultipleUsers = {
    handler: `${handlerPath(__dirname)}/handler.createMultipleUsers`,
    events: [
        {
            http: {
                method: 'post',
                path: 'api/createMultipleUsers',
            },
        },
    ],
};

export const getUser = {
    handler: `${handlerPath(__dirname)}/handler.getUser`,
    events: [
        {
            http: {
                method: 'get',
                path: 'api/{id}',
            },
        },
    ],
};
export const getMultipleUsers = {
    handler: `${handlerPath(__dirname)}/handler.getMultipleUsers`,
    events: [
        {
            http: {
                method: 'get',
                path: 'api/getMultipleUsers',
                request: {
                    parameters: {
                        querystrings: {
                          ids: true, 
                        },
                      },
                }
            },
        },
    ],
};


export const updateUser= {
    handler: `${handlerPath(__dirname)}/handler.updateUser`,
    events: [
        {
            http: {
                method: 'put',
                path: 'api/{id}',
            },
        },
    ],
};

export const deleteUser = {
    handler: `${handlerPath(__dirname)}/handler.deleteUser`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'api/{id}',
            },
        },
    ],
};

export const deleteMultipleUsers = {
    handler: `${handlerPath(__dirname)}/handler.deleteMultipleUsers`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'api/deleteMultipleUsers',
                request: {
                    parameters: {
                        querystrings: {
                          ids: true, 
                        },
                      },
                }

            },
        },
    ],
};