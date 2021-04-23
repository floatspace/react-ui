import React from "react";
// import classnames from "classnames";
import Progress from "../Progress/progress";

import { UploadFile } from "./upload";
import Icon from "../Icon/icon";

interface FileListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

export const FileList: React.FC<FileListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="file-list">
      {fileList.map((file) => {
        return (
          <div key={file.uid}>
            <li className="file-item">
              <span className={`file-name file-name-${file.status}`}>
                <Icon icon="file-alt" theme="secondary" size="2x" />
                <i className="text">{file.name}</i>
              </span>
              <span className="file-status">
                {file.status === "uploading" && (
                  <Icon icon="spinner" spin theme="info" size="2x" />
                )}
                {file.status === "success" && (
                  <Icon icon="check-circle" theme="success" size="2x" />
                )}
                {file.status === "error" && (
                  <Icon icon="times-circle" theme="danger" size="2x" />
                )}
              </span>
              <span className="file-actions">
                <Icon
                  icon="times"
                  size="2x"
                  className="icon-close"
                  onClick={() => {
                    onRemove(file);
                  }}
                />
              </span>
            </li>
            {file.status === "uploading" && (
              <Progress
                percent={file.percent || 0}
                theme="success"
                showText={true}
                strokeHeight={10}
              />
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default FileList;
