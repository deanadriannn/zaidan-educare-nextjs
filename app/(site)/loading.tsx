"use client"

import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <BeatLoader
        color="#ED4498"
        speedMultiplier={1}
        size={15}
      />
    </div>
  )
}