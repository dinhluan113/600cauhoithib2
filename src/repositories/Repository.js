import axios from "axios";

const baseDomain = 'https://api600.luandinh.com';
const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL
}); 