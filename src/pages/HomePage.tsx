import Declaration from "../components/Declaration";
import EntryList from "../components/EntryList";
import Footer from "../components/Footer";
import Search from "../components/Search";
import type { Item } from "../utils/catalog";
import { shuffle } from "../utils/rand";

export default function HomePage(props:{items:Item[]}) {
    return (
        <div className="flex-1 flex flex-col items-center gap-3 m-auto p-2">
            <h1 className='text-4xl font-extrabold tracking-tight bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent drop-shadow-md text-center'>萌萌表情包</h1>
            <div className="flex-1 flex flex-col md:flex-row gap-2">
                <main className="flex-2 flex flex-col gap-2">
                    <EntryList items={shuffle(props.items)}/>
                </main>
                <aside className="flex-1 flex flex-col gap-2">
                    <Declaration/>
                    <Search/>
                </aside>
            </div>
            <Footer/>
        </div>
    )
}