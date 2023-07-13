export interface User{
        id: string,
        name: string,
        username:string,
        email: string,
        avatar: string,
        address:{
            
            street: string,
            suite: string,
            city: string,
          zipcode: string
        },
        phone: string,
        website: string,
        company: {
          name: string,
          catchPhrase: string
        }
}