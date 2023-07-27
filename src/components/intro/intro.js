import Onboarding from "./components/onboarding/onboarding";
import React, { useState, useEffect } from "react";
export default function Intro() {
    const [user, setUser] = useState(null);
    return (
      <>
        <main className="intro"
            style={{
              display: "block",
              height: "60vh",
              width: "100vw",
              backgroundColor: "#000",
            }}
          >
            {user ? (
              <Onboarding />
            ) : (
              <h1>
                CREATIVE <br /> CHORDS
              </h1>
            )}

            <h3>
              Creative Chords is an index of talented and innovative Creative
              Technologists <br /> from around the world - your ultimate guide
              to the world of Creative Technology!{" "}
            </h3>
            {user ? <button>Create a profile</button> : null}
          </main>
      </>
    )
  }