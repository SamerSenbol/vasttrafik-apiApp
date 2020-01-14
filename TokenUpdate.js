import axios from 'axios';              
import client from './credentials';     

export default async function updateToken() {

    const url_token = "https://api.vasttrafik.se/token";
    try {
        
        //----------- vasttrafik api call to get new token -----------
        const res_token = await axios.request({
            method: 'post',
            url: url_token,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: `grant_type=client_credentials&client_id=${client.key}&client_secret=${client.secret}`
        });

        return res_token.data; 

    } catch (err) {
        throw new Error(err);
    }
}