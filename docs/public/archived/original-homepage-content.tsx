/**
 * ARCHIVED HOMEPAGE CONTENT
 * This file contains the original homepage components that were replaced
 * when stories became the new homepage. Preserved for potential future use.
 * Date archived: 2026-01-08
 */

import { HeroVideo } from "../../../theme/HeroVideo";
import { Roadmap } from "../../../theme/RoadmapResponsive";

const roadmapSteps = [
  {
    step: 1,
    title: "Break limiting beliefs. You can dance.",
    description:
      "What if you told a baby to do multiplication when they don't even know how to do addition? This is how everyone is with dancing. We see people do multiplication on the dance floor while we don't know how to do basic addition, causing us extreme anxiety. This problem ends today.",
  },
  {
    step: 2,
    title: "Learn body isolations",
    description:
      "There is no dancing yet! Embrace the spiritual act of connecting with your body. You're going to move parts of your body that you never knew you could <3",
  },
  {
    step: 3,
    title: "Apply the body isolations to the dance style, Bachata",
    description:
      "Understanding the isolated isolations makes you feel like any move is in reach :)",
  },
];

export const ArchivedHomepageContent = () => (
  <div>
    <HeroVideo videoSrc="bachata.mp4" />
    <Roadmap steps={roadmapSteps} />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "40px 0 80px 0",
      }}
    >
      <a href="/guide/lesson" style={{ textDecoration: "none" }}>
        <button
          type="button"
          style={{
            padding: "20px 48px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#ff4757",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(255, 71, 87, 0.4)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ff6b7a";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(255, 71, 87, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ff4757";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(255, 71, 87, 0.4)";
          }}
        >
          Learn now!
        </button>
      </a>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
        marginTop: "15rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ textAlign: "center" }}>
          To share this site with others...
        </p>
        <img
          src="shar.png"
          alt="wow"
          style={{ display: "block", margin: "0 auto", maxWidth: "300px" }}
        />
      </div>
    </div>
  </div>
);