import type { Item } from "../utils/catalog";

export default function HomePage(props:{items:Item[]}) {
    return (
        <div className="flex-1 flex flex-col items-center gap-3 m-auto p-2">
            <h1 className='text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#39c5bb] to-[#66CCFF] bg-clip-text text-transparent drop-shadow-md text-center'>萌萌表情包</h1>
            <div className="flex-1 flex flex-col md:flex-row gap-2">
                <main className="flex-2 flex flex-col gap-2">
                {
                    props.items.map((item, i) => {
                    return (
                        <a key={i} href={`/${item.dir}`} className="bg-fuchsia-50 dark:bg-gray-700 rounded-md p-3 pt-1 hover:text-violet-300 hover:shadow">
                            <p className="text-center text-md font-medium">{item.dir.replaceAll('/', ' ')}</p>
                            <img src={`/meme/${item.dir}/${item.preview}`} alt={`${item.dir} 预览`}/>
                        </a>
                    )
                    })
                }
                </main>
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