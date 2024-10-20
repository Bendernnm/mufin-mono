import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env);

export { MonoBankAPI } from './api';
