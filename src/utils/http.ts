import { message as Message } from "antd";
import axios from "axios";
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

interface PendingTask {
  config: AxiosRequestConfig;
  resolve: (value: unknown) => void;
}
interface Response {
  data: unknown;
  status: number;
  message: string;
}
function refreshToken(): Promise<Response> {
  return new Promise((resolve) => {
    resolve({ data: "", status: 200, message: "哈哈" });
  });
}

class HttpClient {
  private readonly instance: AxiosInstance;
  private pendingTask: PendingTask[] = [];
  private refreshing: boolean = false;
  constructor(options: CreateAxiosDefaults) {
    this.instance = axios.create(options);
    this.instance.interceptors.request.use((config) => {
      return config;
    });
    this.instance.interceptors.response.use(
      (response) => {
        if (response.status >= 400) {
          return Promise.reject(response);
        }
        return response.data;
      },
      async (err: AxiosError<Response>) => {
        if (!err.response) {
          Message.error("请求错误：" + err.message);
          return Promise.reject(err.response);
        }
        const { data, config } = err.response;
        if (this.refreshing) {
          return new Promise((resolve) => {
            this.pendingTask.push({
              config,
              resolve,
            });
          });
        }
        if (data.status === 401 && !config.url!.includes("/user/refresh")) {
          this.refreshing = true;
          try {
            const res = await refreshToken();
            this.refreshing = false;
            if (res.status < 400) {
              this.pendingTask.map(({ config, resolve }) => {
                resolve(this.request(config));
              });
            }
          } catch (err) {
            this.pendingTask = [];
            Message.error("登录已过期，请重新登录");
            location.href = "/login";
          }
        }
        return Promise.reject(err);
      }
    );
  }
  request<T, R>(config: AxiosRequestConfig<T>): Promise<AxiosResponse<R>> {
    return this.instance.request(config);
  }
  post<T, R>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.instance.post(url, data, config);
  }
  get<T, R>(
    url: string,
    config?: AxiosRequestConfig<T>
  ): Promise<AxiosResponse<R>> {
    return this.instance.get(url, config);
  }
}

export default new HttpClient({
  timeout: 1000 * 60,
  baseURL: import.meta.env.VITE_API_URL,
});
