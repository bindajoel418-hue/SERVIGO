export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
export interface LoginDto {
  email: string;
  password: string;
}