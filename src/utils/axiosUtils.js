import axios from 'axios';
import qs from 'qs';

export default {
    http(url, obj) {
        return new Promise((resolve, reject) => {
            axios.post(
                url,
                qs.stringify(obj), {
                    headers: {
                        'token': localStorage.getItem('x_token')
                    }
                }
            ).then((res) => {
                resolve(res.data)
            }).catch((res) => {
                reject(res.data);
            })
        })

    }

}
