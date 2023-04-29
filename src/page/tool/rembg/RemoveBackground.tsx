import { PhotoResponse } from "@/models/photo/PhotoResponse";
import { uploadBackgroundImage } from "@/service/tool/rembg/PhotoService";
import { Breadcrumb } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./RemoveBackground.css";

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
    const [imgUrl, setImgUrl] = useState<string>('');
    const [remBgPhoto, setRemBgPhoto] = useState<PhotoResponse>();
    const { photo } = useSelector((state: any) => state.photo);

    React.useEffect(() => {
        if (photo) {
            setRemBgPhoto(photo);
        }
    }, [photo]);

    const handleUpload = async () => {
        if (file) {
            fileToBase64(file).then(async (result) => {
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

    const baseUrl = 'data:image/png;base64,' + remBgPhoto?.foreground;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImgUrl(reader.result as string);
            };
        }
    };

    const renderResult = () => {
        return (
            <div className="rembg-result">
                {imgUrl?<img src={imgUrl}></img>:<div></div>}
                {remBgPhoto?.foreground?<img src={baseUrl}></img>:<div></div>}
            </div>
        );
    }

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
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="rembg-params">
                    <div>
                        <span>选择背景：</span>
                        <a title="白色背景" className="original-bg"></a>
                        <a title="红色背景" className="bg-red"></a>
                    </div>
                    <button onClick={handleUpload}>抠图</button>
                </div>
                {renderResult()}
            </div>
        </div>
    );
}

export default RemoveBackground