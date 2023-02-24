import axios, {
  isCancel,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const getHTTPHeaders = (headers: RawAxiosRequestHeaders) => {
  const result = { ...defaultHeaders, ...headers } as RawAxiosRequestHeaders;

  return Object.keys(result).reduce((accum: RawAxiosRequestHeaders, val) => {
    if (result[val]) accum[val] = result[val];

    return accum;
  }, {});
};

const makeRequest = async (
  {
    url,
    method = "GET",
    headers = {},
    params = {},
    data,
    timeout = 0,
  }: AxiosRequestConfig,
  mock?: boolean
) => {
  try {
    const opts: AxiosRequestConfig = {
      method,
      headers: getHTTPHeaders(headers),
      url,
      params,
      timeout,
    };
    if (data) {
      opts.data = data;
    }

    const res = await axios(opts);

    if (mock) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(res.data);
        }, 1000);
      });
    }

    return res.data;
  } catch (e) {
    if (isCancel(e)) return null;
    throw e;
  }
};

const get = async (url: string, mock?: boolean) =>
  await makeRequest({ url, method: "GET" }, mock);

export { get };
