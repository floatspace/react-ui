import React, { useRef, useState } from "react";
// import classnames from 'classnames'
import axios from "axios";
import UploadList from "./uploadList";
import Drag from "./drag";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  raw?: File;
  status?: UploadFileStatus;
  percent?: number;
}

// type UploadFileProps = UploadFile & File;
export interface UploadProps {
  action: string;
  onSuccess?: (data: any, file: File) => void;
  onProgress?: (percent: number, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  name?: string;
  data?: { [key: string]: any };
  headers?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  isDrag?: boolean;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    children,
    onSuccess,
    onProgress,
    onError,
    beforeUpload,
    onChange,
    name,
    data,
    headers,
    withCredentials,
    accept,
    multiple,
    isDrag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {uid:'001', name: 'file1.jpg', size: 200, status: 'success', percent: 10},
    // {uid:'002', name: 'file2.txt', size: 200, status: 'error', percent: 50},
    // {uid:'003', name: 'file3.txt', size: 200, status: 'uploading', percent: 20},
  ]);

  const updateFileList = (
    uploadFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === uploadFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  // 发送请求
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    // 更新文件列表
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    // 组织formdata入参
    let formData = new FormData();
    formData.append(name || "file", file);
    // 自定义data
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    // 发起请求
    axios
      .post(action, formData, {
        headers: {
          ...headers, // 自定义header
          "Content-Type": "multipart/form-data",
        },
        withCredentials, // 是否携带cookie
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          console.log(percentage);
          updateFileList(_file, { percent: percentage, status: "uploading" });
          if (onProgress) {
            onProgress(percentage, file);
          }
          if (onChange) {
            onChange(file);
          }
        },
      })
      .then((res) => {
        console.log(res);
        updateFileList(_file, { status: "success", percent: 100 });
        if (onSuccess) {
          onSuccess(res, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((error) => {
        updateFileList(_file, { status: "error", percent: 100 });
        if (onError) {
          onError(error, file);
        }
      });
  };

  // 文件上传
  const uploadFlies = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      // 上传前方法判断
      if (beforeUpload) {
        const res = beforeUpload(file);
        if (res && res instanceof Promise) {
          res.then((processFile) => post(processFile));
        } else if (res !== false) {
          post(file);
        }
      } else {
        post(file);
      }
    });
  };

  // input组件文件变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return;
    uploadFlies(files);
  };

  // 上传组件点击触发隐藏input的click事件
  const handleClick = (e: React.MouseEvent) => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList: UploadFile[]) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
  };

  return (
    <div className="upload">
      <div onClick={handleClick}>
        {isDrag ? <Drag onFile={files => uploadFlies(files)}>{children}</Drag> : children}
      </div>
      <input
        ref={fileInput}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
};

export default Upload;
