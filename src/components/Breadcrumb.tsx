import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb(props:{path:string}) {
    const parts = useMemo(() => {
        return props.path.split('/').filter(Boolean);
    }, [props.path]);

    const entries = useMemo(() => parts.map((part, index) => {
        return {
            name: part,
            path: parts.slice(0, index + 1).join('/'),
        };
    }), [parts]);

    return (
        <nav className="flex gap-2 items-center flex-wrap">
            <ol className="flex flex-wrap items-center">
                <li className="flex items-center">
                    <Link className='hover:text-violet-500 dark:hover:text-violet-300 cursor-pointer hover:animate-pulse' to="/">首页</Link>
                </li>
                {
                    entries.map((entry, i) => {
                        return (
                            <li key={i} className="flex items-center">
                                <span className="mx-2">/</span>
                                <Link className='hover:text-violet-500 dark:hover:text-violet-300 cursor-pointer hover:animate-pulse' to={`/${entry.path}`}>{entry.name}</Link>
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    )
}

