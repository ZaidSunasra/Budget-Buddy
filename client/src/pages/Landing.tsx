import { Login } from '@/components/LoginForm';
import { useTheme } from '@/context/theme';

function Landing() {
  const { theme } = useTheme();

  return (
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center font-mono bg-background gap-20 text-primary p-4 lg:flex-row  ${theme}`}
    >
      <div className="w-full md:w-1/2 lg:w-2/5">
        <h1 className="font-extrabold text-5xl mb-4">Budget Buddy</h1>
        <p className="text-2xl">
          Track, analyze, and optimize your expenses with our powerful and
          intuitive expense tracker.
        </p>
      </div>
      <Login />
    </div>
  );
}

export default Landing;
