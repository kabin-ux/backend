import {config} from 'dotenv';

config();

export let PORT = process.env.PORT || 5001;
export let MONGODB_URL = process.env.MONGODB_URL;

export let ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export let ACCESS_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_KEY;


export let REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export let REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

export let JWT_SECRET = process.env.JWT_SECRET;
