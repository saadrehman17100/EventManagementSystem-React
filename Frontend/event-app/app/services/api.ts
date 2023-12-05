import axios from 'axios';

export const signInApi = async (credentials: { UserEmail: string, UserPassword: string }) => {
  try {
    const response = await axios.post("http://localhost:8800/api/users/signin", credentials);
    console.log("Api Response");
    console.log(response.data[0])
    return response.data[0];
    
  } catch (error) {
    throw error;
  }
};

export const signUpApi = async (credentials: { UserName: string, UserEmail: string, UserPassword: string }) => {
  try {
    const response = await axios.post("http://localhost:8800/api/users/signup", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
