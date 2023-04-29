import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Upload, UploadFile } from "antd";
import { useState } from "react";
import './AppIcon.css'
import withConnect from "@/component/hoc/withConnect";

const AppIcon: React.FC = (props) => {

    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

    const handleCancel = () => { };

    const handlePreview = async (file: UploadFile<any>) => {
        if (!file.url && !file.preview) {
            //file.preview = await getBase64(file.originFileObj);
        }

    };

    const handleChange = ({ fileList }: { fileList: UploadFile<any>[] }) => {
        setFileList(fileList);
    };

    const handleSubmit = () => {

    };

    return (
        <div>
            <h3>app icon在线制作</h3>
            <div><Checkbox>iPhone</Checkbox><Checkbox>iPad</Checkbox></div>
            <div><Checkbox>app</Checkbox></div>
            <div className="app-icon-upload">
                <div>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        onChange={handleChange}
                        onPreview={handlePreview}
                        fileList={fileList}
                    >
                    <Button icon={<UploadOutlined />} >上传文件</Button>
                    </Upload>
                </div>
            </div>
        </div>
    );
}

export default withConnect(AppIcon)
