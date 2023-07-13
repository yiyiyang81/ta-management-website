const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
const DEV_BACKEND_ROUTE = "http://localhost:5000"
//const PROD_BACKEND_ROUTE = "https://fall2022-comp307-group6.cs.mcgill.ca" // change with mimi server
const PROD_BACKEND_ROUTE = "https://main.d3mg8e6fi80dx8.amplifyapp.com/"
export const BACKEND_ROUTE = isDevelopment ? DEV_BACKEND_ROUTE : PROD_BACKEND_ROUTE

export const callBackend = async (route : string,params : RequestInit = {}) => {
	const url = new URL(route,BACKEND_ROUTE)
	return await fetch(url,params)
}

export const createBackendUrl = (route : string) => {
	const url = new URL(route,BACKEND_ROUTE)
	return url.toString()
}
