"use client";

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-screen__loader">
        <div>
          <p className="text-center">
            „To, co zaraz zobaczysz, nie należy tylko do niej. Jeśli rezonujesz,
            być może także do ciebie.”
          </p>
        </div>
        <div className="loading-screen__title mb-2">
          <p className="loading-screen__text">LOADING</p>
          <div className="loading-screen__therefore">∴</div>
          <p className="loading-screen__number">%</p>
        </div>
        <div className="loading-screen__bar-border">
          <div className="loading-screen__bar" />
        </div>
        <div className="loading-screen__warning">
          <div className="loading-screen__exclamation">!</div>
          UWAGA, Do not turn off.
          <div className="loading-screen__line-cascades" />
        </div>
      </div>
    </div>
  );
}
