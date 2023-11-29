import { Axios } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

class ChatApi {
    private axios: Axios;


    constructor() {
        this.axios = new Axios({
            baseURL: "https://api.openai.com/v1/chat/completions",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_TOKEN}`,
            },
            maxBodyLength: Infinity,
            withCredentials: true,
            httpsAgent: new HttpsProxyAgent(process.env.PROXY_STRING),
            transformResponse: res => JSON.parse(res),
            transformRequest: req => JSON.stringify(req),
        })
    }


}
