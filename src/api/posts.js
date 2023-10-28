import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:3500'
})
//run server: npx json-server -p 3500 -w data/db.json