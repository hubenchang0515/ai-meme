export default function Button(props:React.ComponentProps<'button'>) {
    return (
        <button className="cursor-pointer flex justify-center gap-1 py-1 px-3 rounded-md 
                            font-medium text-white bg-pink-400 dark:bg-emerald-600 
                            hover:-translate-y-px active:translate-y-px" 
                {...props}
        />
    )
}