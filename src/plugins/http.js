
const http = {
    post: (url, data) => {
        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        }
        return new Promise(resolve => {
            fetch(url, options)
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
        })
    },
    postAut: (url, data, token) => {
        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json",
                authorization: token
            },
            body: JSON.stringify(data)
        }
        return new Promise(resolve => {
            fetch(url, options)
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
        })
    },
    get: (url) => {
        return new Promise(resolve => {
            fetch( url)
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
        })
    }
}

export default http