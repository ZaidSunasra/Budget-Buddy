import { Login } from "../component/Login";


export function Landing() {

    return <div className="w-100 h-screen flex flex-col justify-around items-center lg:flex-row">
        <div>
            <h1 className="text-5xl font-bold font-mono text-blue-600">Budget Buddy</h1>
        </div>
        <Login />
    </div>
}