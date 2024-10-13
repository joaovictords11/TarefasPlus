import React, { HTMLProps} from "react";
import styles from "./textArea.module.css";

const TextArea = ({...props} : HTMLProps<HTMLTextAreaElement>) => {

  return <textarea className={styles.textarea} {...props}/>;
};

export default TextArea;
