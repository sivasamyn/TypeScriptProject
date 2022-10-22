import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class LocationApi {
  static token:string;

  // Axios request Method
  static async request(endpoint:string, data:object = {}, method:any = "get"):Promise<any> {
    // console.log("API Call:", endpoint, data, method);

    const url:string = `${BASE_URL}/${endpoint}`;
    const headers:object = { Authorization: `Bearer ${LocationApi.token}` };
    const params:object = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err:any) {
      console.log("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // ROUTES:

  /*  Get all of the location from server */

  static async getAlllocations():Promise<any> {
    let res:any = await this.request(`api/locations`);
    return res;
  }

  /* Post a new location */

  static async postAlocation(data:object):Promise<any>  {
    let res:any = await this.request(`api/locations`, data, "post");
    return res;
  }

  /* Get the current user */

  static async getCurrentUser(username:string):Promise<any>  {
    let res:any = await this.request(`api/users/${username}`);
    return res;
  }

  /** Get the token for login from username and password */

  static async login(data:object):Promise<any>  {
    let res:any = await this.request(`api/auth/token`, data, "post");
    return res.token;
  }

  /** Signup for the site */

  static async signup(data:object):Promise<any>  {
    let res:any = await this.request(`api/auth/register`, data, "post");
    return res.token;
  }

  /** Edit a User's data */

  static async editUser(data:any):Promise<any>  {
    let res:any = await this.request(`api/users/${data.email}`, data, "patch");
    return res;
  }
}

export default LocationApi;
