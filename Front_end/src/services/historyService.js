import instance from '../axios';

const { instance_1, instance_2 } = instance;


const HandleGetHistory = async (email) => {

    const formData = new FormData();
    formData.append('email', email);
    console.log(email)

    try {
        const response = await instance_1.post('/api_database/get_images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("data: ", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }

    
};

export { HandleGetHistory };
