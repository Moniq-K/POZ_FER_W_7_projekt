import React from "react";
import styles from "./App.scss";
import image from "../../assets/image.jpeg";

export default class App extends React.Component {
    render(){
        return <div className={styles.app}>To jest App 4<img src={image}/></div>
    }
}