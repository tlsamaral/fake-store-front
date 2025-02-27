import axios from 'axios'

// Poderia utilizar uma env variable para isso, mas como é um caso simples, deixei a url por aqui mesmo.
export const api = axios.create({
	baseURL: 'https://fakestoreapi.com',
})
