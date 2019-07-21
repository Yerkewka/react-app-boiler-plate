import React from 'react';
import { useTranslation } from 'react-i18next';
import tree from '../assets/img/tree.jpg';

const App = () => {  
    const { t } = useTranslation('', { useSuspense: false });

    return (
      <div className="app">
        <h1>Hello, Yerkewka! {t('LANG')}</h1>
        <img src={tree} alt="Tree" />
      </div>
    );  
}

export default App;
