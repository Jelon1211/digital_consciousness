"use client";

export default function Loading() {
  return (
    <>
      <div className="loading-container">
        <div id="loader">
          <div>
            <p className="text-center">
              „To, co zaraz zobaczysz, nie należy tylko do niej. Jeśli
              rezonujesz — być może także do ciebie.”
            </p>
          </div>
          <div id="title" className="flex mb-2">
            <p className="loading-text">LOADING</p>
            <div className="therefore">∴</div>
            <p className="loading-number">%</p>
          </div>
          <div id="loading-bar-border">
            <div className="loading-bar"></div>
          </div>
          <div id="warning">
            <div className="exclamation">!</div>
            UWAGA, Do not turn off.
            <div id="line-cascates"></div>
          </div>
        </div>
      </div>
    </>
  );
}
