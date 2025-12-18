import { useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button";

export default function Search() {
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const search = useCallback(() => {
        navigate(`/search/${inputRef.current?.value}`)
    }, []);
    return (
        <div className="w-full">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="search"
                    placeholder="搜索…"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10
                            text-sm text-gray-900 placeholder-gray-400
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') {
                            search();
                        }
                    }}
                />
                <Button
                    className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-blue-600"
                    onClick={search}
                >
                🔍
                </Button>
            </div>
        </div>
    )
}