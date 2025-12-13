export default function Footer() {
    return (
        <footer>
            <span className='flex flex-row gap-2 text-xs sm:text-sm text-slate-500'>
                <a className='cursor-pointer hover:text-violet-400 hover:animate-pulse' href='https://xplanc.org/'>我的主页</a>
                <a className='cursor-pointer hover:text-violet-500 hover:animate-pulse' href='https://github.com/hubenchang0515/ai-meme'>本站源码</a>
            </span>
        </footer>
    )
}