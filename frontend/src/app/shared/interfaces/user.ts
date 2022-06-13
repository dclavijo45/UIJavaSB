export interface IUser {
    id: number,
    name: string,
    lastname: string,
    username: string,
    email: string,
    country: string,
    city: string,
    numberTelephone: string,
    password: string | null,
    token: string | null
}
