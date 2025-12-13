import { useCallback } from "react";
import DownloadIcon from "../assets/icons/DownloadIcon";
import ShareIcon from "../assets/icons/ShareIcon";
import type { Item } from "../utils/catalog";
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import Declaration from "../components/Declaration";
import Breadcrumb from "../components/Breadcrumb";
import Search from "../components/Search";

const ORIGON = 'https://meme.xplanc.org'

export default function DetailPage(props:{item:Item}) {
    const share = useCallback(async () => {
        navigator.share({
            title: props.item.dir.replaceAll('/', ' ') + ' 萌萌表情包',
            text: props.item.dir.replaceAll('/', ' ') + ' 萌萌表情包',
            url: window.location.toString(),
        })
        navigator.clipboard.writeText(props.item.dir.replaceAll('/', ' ') + ' 萌萌表情包\n' + window.location.toString());
    }, [props.item]);

    const download = useCallback(async () => {
        const zip = new JSZip();
        for (const image of props.item.images) {
            const response = await fetch(`/meme/${props.item.dir}/${image}`);
            const blob = await response.blob();
            zip.file(image, blob);
        }
        zip.file("README.txt", `本站（${ORIGON}）表情均由 AI 生成，禁止用于商业用途。`);
        zip.file("README.md", `![预览](${ORIGON}/meme/${props.item.dir}/${props.item.preview})\n\n本站（<${ORIGON}>）表情均由 AI 生成，禁止用于商业用途。`);
        const content = await zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9
            }
        });
        saveAs(content, props.item.dir.replaceAll('/', '-') + '.zip');
    }, [props.item]);

    return (
        <div className="flex-1 flex flex-col items-center gap-3 m-auto p-2">
            <h1 className='text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#39c5bb] to-[#66CCFF] bg-clip-text text-transparent drop-shadow-md text-center'>{props.item.dir.replaceAll('/', ' ')}</h1>
            <div className="flex-1 flex flex-col md:flex-row gap-2">
                <div className="flex-2 flex flex-col gap-2">
                    <img className="rounded-md hover:shadow" src={`/meme/${props.item.dir}/${props.item.raw}`} alt={`${props.item.dir} 原图`}/>
                    <div className="flex gap-2 justify-end items-center flex-wrap">
                        <Breadcrumb path={props.item.dir}/>
                        <span className="flex-1"/>
                        <div className="flex gap-2 items-center">
                            <button className="cursor-pointer bg-pink-300 dark:bg-emerald-600 py-1 px-3 rounded-md hover:scale-105 active:scale-95" onClick={share}><ShareIcon/></button>
                            <button className="cursor-pointer bg-pink-300 dark:bg-emerald-600 py-1 px-3 rounded-md hover:scale-105 active:scale-95" onClick={download}><DownloadIcon/></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
                        {
                            props.item.images.map((image, i) => {
                                return (
                                    <div key={i}>
                                        <img className="w-full bg-green-100 rounded-md hover:shadow" src={`/meme/${props.item.dir}/${image}`} alt={`${props.item.dir} #${i+1}`}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
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