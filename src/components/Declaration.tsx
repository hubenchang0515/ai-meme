export default function Declaration() {
    return (
        <div className="bg-fuchsia-50 dark:bg-gray-700 rounded-md p-2 text-xs sm:text-sm">
            <div>
                <img src="/icon.png"/>
            </div>
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
    )
}