import instance from '../axios';

const { instance_1 } = instance;

const handleImageClassify = async (file) => {
  const formData = new FormData();
  formData.append('imageFile', file);

  const response = await instance_1.post('/image_classification/upload_image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data;
};

export { handleImageClassify };
