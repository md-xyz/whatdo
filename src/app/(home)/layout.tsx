import { Navbar } from "@/modules/home/ui/components/navbar";

interface Props {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="fixed inset-0 -z-10 h-full w-full bg-background [background-size:16px_16px] dark:bg-[url('/lights.png')] dark:bg-cover dark:bg-center dark:bg-no-repeat" />
            <div className="flex-1 flex flex-col px-4 pb-4">
                {children}
            </div>
        </main>
    );
};

export default Layout;