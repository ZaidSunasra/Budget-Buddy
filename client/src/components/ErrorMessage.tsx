export function ErrorMessage({ message }: { message: string | undefined }) {
  return (
    <>
      <p className="text-red-500 mt-1"> {message} </p>
    </>
  );
}
