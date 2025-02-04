import axios from 'axios';


const instance_1 = axios.create({
    baseURL: "http://34.194.78.200:8080", 

});


const instance_2 = axios.create({
    baseURL: 'http://34.194.78.200:8000',
})

const instances = { instance_1, instance_2 };

export default instances;