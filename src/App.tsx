import { Route, Routes } from 'react-router-dom';
import items from './assets/index.json';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import MatchPage from './pages/MatchPage';
import SearchPage from './pages/SearchPage';
import { ScrollToTop } from './components/ScrollToTop';
import { useEffect, useState } from 'react';
import InstallContext from './components/InstallContext';

function App() {
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        });
    }, []);
    
    return (
        <div className='w-full min-h-full flex flex-col text-black bg-violet-100 dark:text-white dark:bg-gray-800 overflow-auto'>
            <div className='max-w-7xl flex-1 flex flex-col items-center gap-3 m-auto p-2'>
                <ScrollToTop/>
                <InstallContext.Provider value={{installPrompt:installPrompt}}>
                    <Routes>
                        <Route path='/' element={<HomePage items={items}/>}/>
                        <Route path='/search/:text?' element={<SearchPage items={items}/>}/>
                        {
                            items.map((item, i) => {
                                return (
                                    <Route key={i} path={`/${item.dir}`} element={<DetailPage item={item}/>}/>
                                )
                            })
                        }
                        <Route path='/*' element={<MatchPage items={items}/>}/>
                    </Routes>
                </InstallContext.Provider>
            </div>
        </div>
    )
}

export default App
