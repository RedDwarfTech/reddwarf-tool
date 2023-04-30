import { PhotoResponse } from "@/models/photo/PhotoResponse";
import { uploadBackgroundImage } from "@/service/tool/rembg/PhotoService";
import { Breadcrumb, Button, message } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./RemoveBackground.css";
import { v4 as uuid } from 'uuid';
import { RdColor } from 'js-wheel';

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
    const [bgColor, setBgColor] = useState('#ffffff');

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
                {remBgPhoto?.foreground ? <img id="removed-img" style={{ backgroundColor: bgColor }} alt="抠图结果" src={baseUrl}></img> : <div></div>}
            </div>
        );
    }

    const triggerSelected = (value: string) => {
        setImgBg(value);
        switch (value) {
            case 'red':
                setBgColor('#FF0000');
                break;
            case 'blue':
                setBgColor('#0000FF');
                break;
            case 'origin':
                setBgColor('');
                break;
            default:
                message.warning("不支持的背景颜色");
                break;
        }
    }

    const downloadImpl = () => {
        const element = document.getElementById('removed-img') as HTMLImageElement;
        if (!element) {
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = element.naturalWidth;
        canvas.height = element.naturalHeight;
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }
        context.drawImage(element as HTMLImageElement, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        if (bgColor !== "origin") {
            const pixelData = imageData.data;

            // 定义希望替换的背景颜色
            const rgba = RdColor.colorToRGBA(bgColor);
            if (!rgba) {
                message.warning("不支持的背景色");
                return;
            }
            const r = rgba[0];
            const g = rgba[1];
            const b = rgba[2];

            // 遍历像素数据，将背景颜色替换为指定颜色
            for (let i = 0; i < pixelData.length; i += 4) {
                const red = pixelData[i];
                const green = pixelData[i + 1];
                const blue = pixelData[i + 2];
                const alpha = pixelData[i + 3];

                // 判断当前像素是否为背景颜色
                if (red === 0 && green === 0 && blue === 0 && alpha === 0) {
                    pixelData[i] = r;
                    pixelData[i + 1] = g;
                    pixelData[i + 2] = b;
                    pixelData[i + 3] = 255;
                }
            }
        }
        context.putImageData(imageData, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'image.png';
        link.click();
    }


    const renderDownload = () => {
        return (
            <div>
                <Button onClick={downloadImpl}>下载图片</Button>
            </div>);
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
                        <a title="蓝色背景"
                            onClick={() => triggerSelected("blue")}
                            className={`bg-blue ${imgBg === "blue" ? "bg-blue-active" : ""}`}></a>
                    </div>
                    <button onClick={handleUpload}>抠图</button>
                </div>
                {renderResult()}
                {renderDownload()}
            </div>
        </div>
    );
}

export default RemoveBackground