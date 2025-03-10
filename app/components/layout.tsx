
import Navbar from "./navbar"
import Appbar from "./appbar"

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
    <html lang="en">
      <body>
        <main> 
        <div className="flex h-screen">
            <Navbar />
            <div className="flex-1 ">
                <Appbar />
                <div className="px-10 py-6">
                    {children}
                </div>
            </div>
        </div>
        </main>
        </body>
    </html>
    )
}