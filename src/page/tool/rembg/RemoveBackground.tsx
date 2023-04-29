import { PhotoResponse } from "@/models/photo/PhotoResponse";
import { uploadBackgroundImage } from "@/service/tool/rembg/PhotoService";
import { Breadcrumb, message } from "antd";
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
    const [imgBg, setImgBg] = useState<string>('origin');
    const [remBgPhoto, setRemBgPhoto] = useState<PhotoResponse>();
    const { photo } = useSelector((state: any) => state.photo);

    React.useEffect(() => {
        if (photo) {
            setRemBgPhoto(photo);
        }
    }, [photo]);

    const handleUpload = async () => {
        if (!file) {
            message.warning("请选择图片");
            return;
        }
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
                {imgUrl ? <img alt="原图" src={imgUrl}></img> : <div></div>}
                {remBgPhoto?.foreground ? <img alt="抠图结果" src={baseUrl}></img> : <div></div>}
            </div>
        );
    }

    const triggerSelected = (value: string) => {
        setImgBg(value);
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
                    <input type="file" title="请选择文件" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="rembg-params">
                    <div>
                        <span>选择背景：</span>
                        <a title="白色背景"
                            onClick={() => triggerSelected("origin")}
                            className={`original-bg ${imgBg === "origin" ? "original-bg-active" : ""}`}></a>
                        <a title="红色背景"
                            onClick={() => triggerSelected("red")}
                            className={`bg-red ${imgBg === "red" ? "bg-red-active" : ""}`}></a>
                    </div>
                    <button onClick={handleUpload}>抠图</button>
                </div>
                {renderResult()}
            </div>
        </div>
    );
}

export default RemoveBackground