import { Route, Routes } from 'react-router-dom';
import items from './assets/index.json';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import MatchPage from './pages/MatchPage';
import SearchPage from './pages/SearchPage';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
    return (
        <div className='w-full min-h-full flex flex-col text-black bg-violet-100 dark:text-white dark:bg-gray-800 overflow-auto'>
            <div className='max-w-7xl flex-1 flex flex-col items-center gap-3 m-auto p-2'>
                <ScrollToTop/>
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
            </div>
        </div>
    )
}

export default App
