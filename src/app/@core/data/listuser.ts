export interface IListUser {
    username: string;
    password: string;
    fullname: string;
    email:string;
    recaptcha:string
}
export interface IUserLogin{
    username: string;
    password: string;
}

export function CreateUser(data): IListUser {
    return {
        username: data.username,
        password: data.password,
        fullname: data.fullname,
        email: data.email,
        recaptcha: data.recaptcha

    }
}
