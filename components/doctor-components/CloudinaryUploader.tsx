import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadProps } from "antd";

const { Dragger } = Upload;

interface CloudinaryUploaderProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
}

const CloudinaryUploader = ({ onUploadSuccess }: CloudinaryUploaderProps) => {
  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
  const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg'];

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isValidType = allowedTypes.includes(file.type);
    if (!isValidType) {
      message.error(`You can only upload ${allowedExtensions.join(', ')} files!`);
      return false;
    }

    const isLt20M = file.size / 1024 / 1024 <= 20;
    if (!isLt20M) {
      message.error('File must be smaller than 20MB!');
      return false;
    }

    return true;
  };

  const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    
    formData.append('resource_type', 'auto');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        { method: 'POST', body: formData }
      );
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      onUploadSuccess(data.secure_url);
      onSuccess!(data);
    } catch (error) {
      console.error('Upload error:', error);
      onError!(error as Error);
      message.error('Upload failed. Please try again.');
    }
  };

  return (
    <Dragger
      accept={allowedTypes.join(',')}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      multiple={false}
      listType="picture-card"
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined style={{ fontSize: "25px" }} />
      </p>
      <p className="ant-upload-text">Click or drag files to this area to upload (if you have multiple files, put them in a single pdf file)</p>
      <p className="ant-upload-hint">
        Supported formats: PDF, PNG, JPG (Max size: 20MB)
      </p>
    </Dragger>
  );
};

export default CloudinaryUploader;