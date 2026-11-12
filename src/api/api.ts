import axios from "axios";
import { store } from "../store/store";
import { logout, setToken } from "../store/slice/authSlice";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

export const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true, // Necessary if sending cookies or using CORS with credentials
});

const refreshApi = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 3. Response Interceptor: Handle 401 Unauthorized errors (expired token)
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Token has expired or is invalid -> log user out

//             // store.dispatch(logout());
//         }
//         return Promise.reject(error);
//     }
// );

type PendingRequest = {
    resolve: (newToken: string) => void;
    reject: (error: unknown) => void;
};

let pendingRequests: PendingRequest[] = [];
let isRefreshing = false;

const processPendingRequests = (
    error: unknown | null,
    newToken: string | null = null,
): void => {
    pendingRequests.forEach(({ resolve, reject }) => {
        if (error !== null) {
            reject(error);
        } else if (newToken !== null) {
            resolve(newToken);
        }
    });

    pendingRequests = [];
};

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Do not retry the same request forever
        if (originalRequest._retry) {
            store.dispatch(logout());
            return Promise.reject(error);
        }

        // Do not attempt to refresh the refresh endpoint itself
        if (originalRequest.url?.includes("/user/refresh")) {
            store.dispatch(logout());
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        // If another request is already refreshing, wait for it
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                pendingRequests.push({ resolve, reject });
            }).then((newToken) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest);
            });
        }

        isRefreshing = true;

        try {
            // The refresh-token cookie is sent automatically
            const refreshResponse = await refreshApi.post("/user/refresh");

            // const newToken = refreshResponse.data.accessToken;
            const newToken = refreshResponse.data;

            if (!newToken || typeof newToken !== "string") {
                throw new Error("Refresh endpoint returned an invalid token");
            }

            // Adjust this action name to match your Redux slice
            store.dispatch(setToken(newToken));

            processPendingRequests(null, newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // Retry the original request
            return api(originalRequest);
        } catch (refreshError) {
            processPendingRequests(refreshError);

            store.dispatch(logout());

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);
