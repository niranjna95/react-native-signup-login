import axios, { AxiosError } from 'axios';
import config from '../config';
const API_KEY: string = 'AIzaSyDCYasArcOwcALFhIj2szug5aD2PgUQu1E';

interface AuthResponseLoing {
  data: {
    token: string;

  };
}



interface AuthResponse {
  data: {
    id: string;
    userName: string;
    fullName: string;
    email: string;
    emailConfirmed: boolean;
    profilePicture: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    timezoneId: string;
    isActive: boolean;
    registerDate: string;
  };
}

async function authenticate(mode: string, email: string, password: string): Promise<string> {
  
  try {
    const response = await axios.post<AuthResponseLoing>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Account/Login`, {
      email: email,
      password: password,
    }, {
      headers: {//
        "content-type": "application/json",
        clientId: `${process.env.NEXT_PUBLIC_API_CLIENT_ID}`,
      }
    });

    const token: string = response.data.data.token;
    return token;
  } catch (err: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (axios.isAxiosError(err)) {
      // Axios error
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
    } else if (err instanceof Error) {
      // Native JS error
      errorMessage = err.message;
    }

    console.error('Error authenticating:', errorMessage);
    throw new Error(errorMessage);
  }
}


async function create(name: string, email: string, phone:string, password:string,confirmPassword:string,profilePicture:string,role:string ): Promise<string> {
  console.log(`Name: ${name} Email: ${email} Phone: ${phone} Password: ${password} ConfirmPassWord ${confirmPassword} Role: ${role}`)



  try {
    const response = await axios.post<AuthResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Account/Create`, {
      parentUserId: "",
      fullName: name,
      email: email,
      phoneNumber:phone,
      password: password,
      confirmPassword: confirmPassword,
      profilePicture: profilePicture,
      roleName: role,
    }, {
      headers: {//
        "content-type": "application/json",
        clientId: `${process.env.NEXT_PUBLIC_API_CLIENT_ID}`,
      }
    });

    const UserName: string = response.data.data.fullName;
    return UserName;
  } catch (err: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (axios.isAxiosError(err)) {
      // Axios error
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
    } else if (err instanceof Error) {
      // Native JS error
      errorMessage = err.message;
    }

    console.error('Error authenticating:', errorMessage);
    throw new Error(errorMessage);
  }
}


export function createUser(name: string, email: string, phone:string, password:string,confirmPassword:string,profilePicture:string,role:string ): Promise<string> {
  return create(name ,email, phone, password,confirmPassword,profilePicture,role);
}

export function login(email: string, password: string): Promise<string> {
  return authenticate('signInWithPassword', email, password);
}
