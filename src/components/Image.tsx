import { useCallback, useRef } from "react"

export default function Image(props:React.ImgHTMLAttributes<HTMLImageElement>) {
    const divRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const onLoad = useCallback(() => {
        imgRef.current?.classList.remove("opacity-0");
        divRef.current?.classList.remove("animate-pulse", "bg-gray-300");
    }, []);

    return (
        <div ref={divRef} className="bg-gray-300 animate-pulse">
            <img ref={imgRef} className="w-full rounded-md hover:shadow opacity-0" {...props} onLoad={onLoad}/>
        </div>
    )
}