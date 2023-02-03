
export default class Rest {
    post(url: string,data: any){
        return fetch(url,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    get(url: string){
        return fetch(url);
    }
}