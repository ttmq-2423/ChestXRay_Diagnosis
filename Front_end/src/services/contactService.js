import instance from '../axios';

const { instance_1, instance_2 } = instance;


const HandleContactApi = async (email,subject,body) => {

    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('body', body);
    console.log(FormData)
    try {
        const response = await instance_1.post('/api_database/contact', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("data: ", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export { HandleContactApi };
