import LiveTimingTable from '../components/LiveTimingTable';

export default function TablePage() {
    return (
        <main className="h-screen w-full bg-black text-white flex flex-col overflow-hidden select-none">

            <header className="flex-none p-4 pb-0">

                <div className="flex justify-center mb-[3vh]">
                    <h1 className="text-4xl font-racing italic font-bold text-brand-red tracking-tighter">
                        Sector<span className="text-brand-red/80">3</span>
                    </h1>
                </div>

                <div className="flex justify-center mb-[1.5vh] px-2">
                    <nav className="flex gap-[5vw] text-sm font-racing font-bold italic tracking-wider text-gray-400">
                        <span className="text-white border-b-2 border-white pb-1 cursor-pointer">POSITIONS</span>
                        <span className="hover:text-white cursor-pointer transition-colors">CIRCUIT</span>
                        <span className="hover:text-white cursor-pointer transition-colors">RADIO MESSAGES</span>
                    </nav>
                </div>
            </header>

            <div className="text-3xl font-black italic tracking-tight font-mono ml-[2vw] my-[2vh]">
                LAP 33/56
            </div>

            <section className="flex-1 w-full overflow-scroll">
                <LiveTimingTable />
            </section>

        </main>
    );
}