import React from'react';
import Header from '../organisms/Header/Header';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styles from './Layout.module.css'

// По дефлоту при создании роутера через createBrowserRouter приложение запоминает текущую позицию скролла, нужно это отменить 
// с помощью ScrollRestoration т.к основная страница может быть очень длинной и при переходе на страничку "Любимых" скролл будет всегда в конце,
// а последние лайкнутые фотки отображаются вначале
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
