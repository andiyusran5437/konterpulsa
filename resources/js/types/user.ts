export interface User {
    name: string
    email: string
}
export interface UserRequest extends User {
    password: string
}
