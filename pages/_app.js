import Header from "./../components/Header"
import styles from "./_app.css"
import { useState } from "react"

export default function App({ Component, pageProps }) {

    return ( <
        >
        <
        Header / >
        <
        main >
        <
        Component {...pageProps }
        /> <
        /main> <
        />
    )
}