import { Axios } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import * as env from 'dotenv';
env.config();
export class ChatApi {
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
            httpsAgent: new HttpsProxyAgent(process.env.PROXY_STRING!),
            transformResponse: res => JSON.parse(res),
            transformRequest: req => JSON.stringify(req),
        })
    }

    public async getGptAnswer(question: string) {
        return await this.axios.post("", {
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": question}],
            temperature: 0.7
        }).then((result) => {
            return result.data.choices[0].message.content;
        }).catch((error) => {
            console.error(error)
        })
    }
}
