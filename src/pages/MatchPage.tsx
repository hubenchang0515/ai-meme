import { useParams } from "react-router-dom";
import type { Item } from "../utils/catalog";
import { useMemo } from "react";
import Declaration from "../components/Declaration";
import Breadcrumb from "../components/Breadcrumb";
import EntryList from "../components/EntryList";
import Search from "../components/Search";

export default function MatchPage(props:{items:Item[]}) {
    const { '*': prefix } = useParams(); // 获取通配符部分
    const items = useMemo(() => {
        return props.items.filter((item) => prefix && item.dir.startsWith(prefix))
    }, [prefix, props.items])

    return (
        <div className="flex-1 flex flex-col items-center gap-3 m-auto p-2">
            <h1 className='text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#39c5bb] to-[#66CCFF] bg-clip-text text-transparent drop-shadow-md text-center'>匹配：{prefix}</h1>
            <div className="flex-1 flex flex-col md:flex-row gap-2">
                <main className="flex-2 flex flex-col gap-2">
                    <div className="bg-fuchsia-50 dark:bg-gray-700 rounded-md px-3 py-1">
                        <Breadcrumb path={prefix??''}/>
                    </div>
                    <EntryList items={items}/>
                </main>
                <aside className="flex-1 flex flex-col gap-2">
                    <Declaration/>
                    <Search/>
                </aside>
            </div>
            <footer>
                <span className='flex flex-row gap-2 text-xs sm:text-sm text-slate-500'>
                    <a className='cursor-pointer hover:text-violet-400 hover:animate-pulse' href='https://xplanc.org/'>我的主页</a>
                    <a className='cursor-pointer hover:text-violet-500 hover:animate-pulse' href='https://github.com/hubenchang0515/meme'>本站源码</a>
                </span>
            </footer>
        </div>
    )
}