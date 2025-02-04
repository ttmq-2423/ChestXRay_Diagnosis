import instance from '../axios';
const {instance_1, instance_2} = instance


const handleStoreImage = async (email, image, result) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('image', image)
    formData.append('result', result)

    try {
        const response = await instance_1.post('/api_database/upload_image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("data: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Login error: ", error);
        throw error.response.data; 
    }
}

export { handleStoreImage };