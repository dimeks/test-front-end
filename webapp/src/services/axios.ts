import axios, { AxiosRequestConfig } from "axios";
import configApp from "@config";
import { auth as authStorage } from "@helpers/localStorage";

export default () => {

    /**
     * baseURL
     */
    axios.defaults.baseURL = configApp.apiURI;

    /**
     * request
     */
    axios.interceptors.request.use(
        (config: AxiosRequestConfig & {
            useToken?: boolean
        }) => {
            if (config.useToken) {
                const access_token = authStorage.get("access_token");
                if (access_token && config.headers) {
                    config.headers["Authorization"] = `Bearer ${access_token}`;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    /**
     * response
     */
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            return Promise.reject(error);
        }
    );
};