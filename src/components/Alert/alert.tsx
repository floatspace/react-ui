import React, { useState } from "react";
import classnames from "classnames";
import { CSSTransition } from "react-transition-group";
import Icon from "../Icon/icon";

type AlertTypes = "success" | "info" | "danger" | "warning";

interface IAlertProps {
  type: AlertTypes;
  message: string;
  closeable?: boolean;
  className?: string;
  onClose?: (e: React.MouseEvent) => void;
}

export const Alert: React.FC<IAlertProps> = (props) => {
  const { type, message, closeable, onClose, className } = props;
  const [showAlert, setAlert] = useState(false);

  const classes = classnames("alert", className, {
    [`alert-${type}`]: type,
    "alert-hide": showAlert,
  });

  // 关闭
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setAlert(true);
    onClose && onClose(e);
  };

  return (
    <CSSTransition
      in={!showAlert}
      timeout={300}
      classNames="alert-out"
      appear
      unmountOnExit
    >
      <div className={classes}>
        <div className="alert-content">{message}</div>
        {closeable ? (
          <div
            className="alert-close"
            onClick={(e) => {
              handleClose(e);
            }}
          >
            <Icon icon="times" theme={type} size="1x" />
          </div>
        ) : (
          ""
        )}
      </div>
    </CSSTransition>
  );
};

export default Alert;
