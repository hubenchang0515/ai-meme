import { useCallback, useMemo } from "react";
import DownloadIcon from "../assets/icons/DownloadIcon";
import ShareIcon from "../assets/icons/ShareIcon";
import type { Item } from "../utils/catalog";
import JSZip from "jszip";
import { saveAs } from 'file-saver';

const ORIGON = 'https://meme.xplanc.org'

export default function DetailPage(props:{item:Item}) {
    const parts = useMemo(() => {
        return props.item.dir.split('/').filter(Boolean);
    }, [props.item.dir]);

    const entries = useMemo(() => parts.map((part, index) => {
        return {
            name: part,
            path: parts.slice(0, index + 1).join('/'),
        };
    }), [parts]);

    const share = useCallback(async () => {
        navigator.share({
            title: props.item.dir.replace('/', ' ') + ' 萌萌表情包',
            text: props.item.dir.replace('/', ' ') + ' 萌萌表情包',
            url: window.location.toString(),
        })
        navigator.clipboard.writeText(props.item.dir.replace('/', ' ') + ' 萌萌表情包\n' + window.location.toString());
    }, [props.item]);

    const download = useCallback(async () => {
        const zip = new JSZip();
        for (const image of props.item.images) {
            const response = await fetch(`/meme/${props.item.dir}/${image}`);
            const blob = await response.blob();
            zip.file(image, blob);
        }
        zip.file("README.txt", `本站（${ORIGON}）表情均由 AI 生成，禁止用于商业用途。`);
        zip.file("README.md", `![预览](${ORIGON}/meme/${props.item.dir}/${props.item.preview})\n\n本站（${ORIGON}/）表情均由 AI 生成，禁止用于商业用途。`);
        const content = await zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9
            }
        });
        saveAs(content, props.item.dir.replace('/', '-') + '.zip');
    }, [props.item]);

    return (
        <div className="flex-1 flex flex-col items-center gap-3 m-auto p-2">
            <h1 className='text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#39c5bb] to-[#66CCFF] bg-clip-text text-transparent drop-shadow-md text-center'>{props.item.dir.replace('/', ' ')}</h1>
            <div className="flex-1 flex flex-col md:flex-row gap-2">
                <div className="flex-2 flex flex-col gap-2">
                    <img className="rounded-md hover:shadow" src={`/meme/${props.item.dir}/${props.item.raw}`} alt={`${props.item.dir} 原图`}/>
                    <div className="flex gap-2 items-center">
                        <a className='hover:text-violet-500 dark:hover:text-violet-300 cursor-pointer hover:animate-pulse' href="/">首页</a>
                        {
                            entries.map((entry, i) => {
                                return <span> / <a key={i} className='hover:text-violet-500 dark:hover:text-violet-300 cursor-pointer hover:animate-pulse' href={`/${entry.path}`}>{entry.name}</a></span>
                            })
                        }
                        <span className="flex-1"/>
                        <button className="cursor-pointer bg-pink-300 dark:bg-emerald-600 py-1 px-3 rounded-md hover:scale-105 active:scale-95" onClick={share}><ShareIcon/></button>
                        <button className="cursor-pointer bg-pink-300 dark:bg-emerald-600 py-1 px-3 rounded-md hover:scale-105 active:scale-95" onClick={download}><DownloadIcon/></button>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
                        {
                            props.item.images.map((image, i) => {
                                return (
                                    <div>
                                        <img key={i} className="w-full bg-green-100 rounded-md hover:shadow" src={`/meme/${props.item.dir}/${image}`} alt={`${props.item.dir} #${i+1}`}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <aside className="flex-1 flex flex-col gap-2">
                    <div className="bg-fuchsia-50 dark:bg-gray-700 rounded-md p-2 text-xs sm:text-sm">
                        本站表情均由 AI 生成，
                        并使用 <a className='text-violet-500 dark:text-violet-300 cursor-pointer hover:animate-pulse' href="https://misc.xplanc.org/cut-6x4">此页面</a> 进行裁剪分割。
                        <br/>
                        <blockquote className="italic border-l-4 border-gray-300 p-1">
                            为我生成图中角色的绘制 Q 版的，LINE 风格的半身像表情包，注意头饰要正确
                            彩色手绘风格，使用 4x6 布局，涵盖各种各样的常用聊天语句，或是一些有关的娱乐 meme
                            其他需求：不要原图复制。所有标注为手写简体中文。
                            生成的图片需为 4K 分辨率 16:9
                            <br/>
                            <cite>提示词 —— <a className='text-violet-500 dark:text-violet-300 cursor-pointer hover:animate-pulse' href="https://linux.do/t/topic/1291014">《拿主人的二次元形象做的表情包，附焚决》</a></cite>
                        </blockquote>
                        禁止用于商业用途。
                    </div>
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