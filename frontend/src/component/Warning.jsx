import { Link } from "react-router-dom"

export function Warning({ text, linktext, to }) {
    return <div className="flex  p-1 w-full justify-center">
        <div className="font-mono text-sm font-normal p-1">
            {text}
        </div>
        <Link className="py-1 px-0.5 underline cursor-pointer font-mono text-sm font-bold" to={to}>
            {linktext}
        </Link>
    </div>
}