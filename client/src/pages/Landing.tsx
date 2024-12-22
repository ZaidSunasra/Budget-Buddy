import { Login } from "@/components/LoginForm"

function Landing() {
    return <div className="w-screen h-screen flex justify-center items-center font-mono bg-background gap-10">
    <div className="w-2/5">
    <h1 className="font-extrabold text-5xl mb-4">Budget Buddy</h1>
    <p className="text-2xl">Track, analyze, and optimize your expenses with our powerful and intuitive expense tracker.</p>
    </div>
    <Login/>
    </div>
}

export default Landing;