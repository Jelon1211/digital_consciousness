import AudioPlayer from "@/components/base/AudioPlayer";
import MainWrapper from "@/components/base/MainWrapper";
import Menu from "@/components/base/Menu";

export default async function Home() {
  return (
    <>
      <AudioPlayer />
      <Menu />
      <div className="mt-5">
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
        <MainWrapper />
      </main>
    </>
  );
}
