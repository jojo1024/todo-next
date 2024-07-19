// import { getServerUrl } from "./functions";
// console.log("🚀 ~ file: apiClient.ts:2 ~ getServerUrl:", getServerUrl())

import { BASE_URL } from "./constants";



export interface IServerResponse {
  status: number;
  data?: any;
  error?: any
  errors?: any
}

export async function request<T>(
  route: string,
  url?: string,
  config?: RequestInit,
): Promise<T> {
  const API_URL: string = BASE_URL
  const myUrl: string =
    url === undefined
      ? `${API_URL}${route}`
      : `${url}${route}`
  const response = await fetch(myUrl, config);
  // console.log(" responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", response)
  const res: any = response.json();
  // console.log("response.json())))))))))))))))))))))))))))", response.json())
  // console.log("+++++++++++++++++++++++++++++++++++++++++++", res)
  // if (res.status === -1) {
  //   // console.log("Xa marcheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  //   store.dispatch(setUserLoggedIn(false));
  // }
  return res;
}

export const apiClient = {
  /**
   * Effectue un GET vers le serveur et renvoi la réponse en Json
   * {status:number; data?:any; error?: any}
   * @param route obligatoire 
   * @param url   optional 
   * @returns IServerResponse
   */
  get: (route: string, url?: string) =>
    request<IServerResponse>(route, url, { credentials: "include" }),

  /**
   * Effectue un POST vers le serveur et renvoi la réponse en Json
   * {status:number; data?:any; error?: any}
   * @param route :string
   * @param payload : object
   * @returns IServerResponses
   */
  post: (route: string, payload: any, url?: string) =>
    request<IServerResponse>(
      route,
      undefined,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        // credentials: "include",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
        },
      }),

}
