import { uploadBackgroundImage } from "@/service/tool/rembg/PhotoService";
import { Breadcrumb } from "antd";
import { useState } from "react";

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

const RemoveBackground: React.FC = (props) => {

    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (file) {
            fileToBase64(file).then(async (result)=>{
                try {
                    const uploadParams = {
                        base64Image: result
                    };
                    uploadBackgroundImage(uploadParams);
                } catch (err) {
                    console.log(err);
                }
            });
        }
    };

    return (
        <div className="rembg-body">
            <Breadcrumb items={[
                {
                    title: '首页',
                    href: '/'
                },
                {
                    title: '一键抠图',
                }
            ]}>
            </Breadcrumb>
            <h3>一键抠图</h3>
            <div className="rembg-container">
                <div className="rembg-upload">
                    <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                    <button onClick={handleUpload}>上传</button>
                </div>
                <div className="rembg-result"></div>
            </div>
        </div>
    );
}

export default RemoveBackground