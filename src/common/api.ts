import axios from 'axios';
import router, { RouteName } from '../router/router';

export const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    // if ([401, 403].includes(response.status)) {
    //   router.push({ name: RouteName.LOGIN });
    // }

    return Promise.reject(error);
  }
)
