import { CloudinaryPresetsValueType } from "@/data/constants";

export const batchUpload = async (files: File[],name:CloudinaryPresetsValueType): Promise<Boolean|string[]> => {
    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', name);
      formData.append('api_key', process.env.CLOUDINARY_API_KEY!);
      formData.append('resource_type', 'auto');
  
      return fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      }).then(async (response) => {
        if (!response.ok) throw new Error('Upload failed');
        return (await response.json()).secure_url;
      });
    });
  
    try {
      const results = await Promise.all(uploadPromises);
      // Each result will have `secure_url`, `public_id`, etc.
      console.log('Batch upload success:', results);
      return results; // Return the array of upload results
    } catch (error) {
      console.error('Batch upload error:', error);
      return false;
    }
};