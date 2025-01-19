import React from'react';
import Header from '../organisms/Header/Header';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styles from './Layout.module.css'

const Layout: React.FC = () => {

    return (
        <>
            <Header/>
            <main className={styles.container}>
                <Outlet/>
            </main>
            <ScrollRestoration/>
        </>
    );
};
export default Layout;
