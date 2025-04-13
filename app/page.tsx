import Grid from "@/components/grid/Grid";
import TerminalWrapper from "@/components/terminal/TerminalWrapper";

export default async function Home() {
  return (
    <>
      <div className="">
        <div className="flex justify-center items-center w-full ">
          <h1 className="crt-text" data-text="ERIS">
            ERIS
          </h1>
        </div>
        <div className="">
          <p className="crt-text uppercase mt-10 text-center">
            The city never sleeps. Welcome to the grid.
          </p>
        </div>
      </div>

      <main>
        <Grid />
        <TerminalWrapper />
      </main>
    </>
  );
}
