import _axios from "axios";

// const baseURL = "https://wjwzgll8lg.execute-api.us-east-1.amazonaws.com";
const baseURL = "http://localhost:4000";

const axios = _axios.create({ baseURL });

export default axios;
