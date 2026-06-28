"use client";

import Image from "next/image";

type TerminalImageLineProps = {
  src: string;
};

export default function TerminalImageLine({ src }: TerminalImageLineProps) {
  return (
    <div className="flex justify-center items-center mt-5">
      <Image
        src={src}
        alt="Terminal Image"
        className="max-w-full rounded-lg shadow-md"
        priority={false}
        width={300}
        height={300}
      />
    </div>
  );
}
