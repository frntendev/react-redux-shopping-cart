import React from "react";
import { css } from "react-emotion";

const styles = {
  pulse: css`
    width: 100%;
    height: 345px;
    background: linear-gradient(-90deg, #efefef 0%, #fcfcfc 50%, #efefef 100%);
    background-size: 400% 400%;
    -webkit-animation: pulse 1.2s ease-in-out infinite;
    -webkit-animation: pulse 1.2s ease-in-out infinite;
    animation: pulse 1.2s ease-in-out infinite;
    background-color: #f5f5f5;

    @-webkit-keyframes pulse {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: -135% 0%;
      }
    }
    @keyframes pulse {
      0% {
        background-position: 0% 0%;
      }
      100% {
        background-position: -135% 0%;
      }
    }
  `
};
const Skeleton = () => {
  return <div className={styles.pulse} />;
};

export default Skeleton;
