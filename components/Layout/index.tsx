import Spinner from "../Spinner";

export default function Layout({ children }: any) {
  return (
    <main className="relative top-0 left-0 bg-primary w-screen h-screen font-sans">
      {children}
      <Spinner />
    </main>
  );
}
