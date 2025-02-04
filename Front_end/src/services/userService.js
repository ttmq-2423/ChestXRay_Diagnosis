
import instance from '../axios';
import avatar from '../assets/images/iconpeople.png'



const {instance_1, instance_2} = instance

const handleLoginApi = async  (email, password) => {

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
        const response = await instance_1.post('/api_database/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("data: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Login error: ", error);
        throw error.response.data; // Thêm .response để lấy dữ liệu từ phản hồi lỗi
    }

}

const handleRegisterApi = async (firstName, lastName, email, password) => {

    const formData = new FormData();
    formData.append('firstName', firstName );
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    try {
        const response = await instance_1.post('/api_database/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("data: ", response.data);
        return response.data;
    } catch (error) {
        console.error("register error: ", error);
        throw error.response.data; // Thêm .response để lấy dữ liệu từ phản hồi lỗi
    }

}

const handleGetInforApi = async(email) =>{
    const formData = new FormData();
    formData.append('email', email);
    console.log(email);

    try {
        const response = await instance_1.post('/api/user/user_infor', formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error){
        console.error("Get user infor error: ", error);
        throw error.response.data;
    }
}

const handleAvatarUpdateApi = async(email, avatar) =>{
    const formData = new FormData();
    formData.append('email', email);
    formData.append('avatar', avatar);

    try {
        const response = await instance_1.post('/api_database/update_avatar', formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error){
        console.error(error);
        throw error.response.data;
    }
}


export { handleLoginApi, handleRegisterApi, handleGetInforApi, handleAvatarUpdateApi };