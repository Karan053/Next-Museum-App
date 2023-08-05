import { getToken } from "./authenticate"


//fetch data
async function fetchData(url, method, data){
    let token = getToken();

    let headers = {
        "content-type": "application/json",
        Authorization : `JWT ${token}`
    }

    let options = {
        method, 
        headers,
        body : JSON.stringify(data)
    }

    const res = await fetch(url, options);
    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
}

// /favourites/id
//add , PUT
export async function addToFavourites(id) {
    return await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, "PUT");
}
//remove , DELETE  
export async function removeFromFavourites(id) {
return await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, "DELETE");
}
//get
export async function getFavourites() {
return await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, "GET");
}

// /history/id
//add , PUT
export async function addToHistory(id) {
return await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, "PUT");
}
//remove, DELETE
export async function removeFromHistory(id) {
return await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, "DELETE");
}
//GET
export async function getHistory() {
return await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/history`, "GET");
}
