import { Link } from "react-router-dom";
import type { Item } from "../utils/catalog";
import { useCallback, useState } from "react";
import DoubleDownIcon from "../assets/icons/DoubleDownIcon";

export default function EntryList(props:{items:Item[]}) {
    const [count, setCount] = useState(5);
    const loadMore = useCallback(() => {
        setCount((count)=>count + 5)
    }, [])

    return (
        <div className="flex flex-col gap-2">
            {
                props.items.slice(0, count).map((item, i) => {
                    return (
                        <Link key={i} to={`/${item.dir}`} className="bg-fuchsia-50 dark:bg-gray-700 rounded-md p-3 pt-1 hover:text-violet-300 hover:shadow">
                            <p className="text-center text-md font-medium">{item.dir.replaceAll('/', ' ')}</p>
                            <img src={`/meme/${item.dir}/${item.preview}`} alt={`${item.dir} 预览`}/>
                        </Link>
                    )
                })
            }
            {
                count >= props.items.length ? <></> :
                <button className="cursor-pointer py-1 px-3 rounded-md flex justify-center bg-pink-200 hover:shadow active:bg-rose-200 
                                    dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:active:bg-emerald-600" onClick={loadMore}>
                    <DoubleDownIcon/>
                </button>
            }
        </div>
    )
}