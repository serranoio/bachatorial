import Theme, { Search } from "rspress/theme";
import { Hero } from "./CustomHero";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { VideoPlayer } from "./VideoPlayer";
import { StoriesHub } from "./StoriesHub";
import { storyData } from "./storyData";
import { GlobalAnimatedBackground } from "./GlobalAnimatedBackground";

// Import all CSS styles - ensures consistent styling in both dev and production builds
import "./styles";

// Show all props below
const Layout = () => (
  <Theme.Layout
    /* Top of the entire page */
    top={<GlobalAnimatedBackground />}
    /* Before home hero */
    afterHero={<div></div>}
    /* After home hero */
    beforeHero={
      <div>
        <div
          style={{
            position: "relative",
            minHeight: "600px",
            padding: "60px 20px 40px 20px",
          }}
        >
          {/* Center content: Logo and Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <img
              src="/logo.png"
              alt="Bachatorial Logo"
              style={{
                width: "120px",
                height: "120px",
                marginBottom: "24px",
              }}
            />
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                margin: "0 0 8px 0",
                background: "linear-gradient(135deg, var(--color-gold-light, #E8D4A8) 0%, var(--color-coral, #FF8B94) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              Bachatorial
            </h1>
            <p
              style={{
                fontSize: "24px",
                fontStyle: "italic",
                color: "var(--color-gold-warm, #D4AF88)",
                margin: "0 0 24px 0",
                opacity: 0.8,
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              An intro for why everyone can dance, stylized in Bachata 
            </p>
            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                color: "var(--color-gold-warm, #D4AF88)",
                margin: "0 0 24px 0",
                opacity: 0.8,
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              by David Serrano
            </p>
          </div>

          {/* Scattered Fact Statements */}
          <div className="facts-container">
            <p className="fact fact-1">
              <strong style={{ color: "var(--color-gold-light, #E8D4A8)" }}>Fact:</strong> The biggest barrier to dancing is <strong>mental</strong>, not physical.
            </p>
            <p className="fact fact-2">
              <strong style={{ color: "var(--color-gold-light, #E8D4A8)" }}>Fact:</strong> Life is a dance—we've just forgotten.
            </p>
            <p className="fact fact-3">
              <strong style={{ color: "var(--color-gold-light, #E8D4A8)" }}>Fact:</strong> The language of dance is universal. It defies gender and age boundaries.
            </p>
          </div>
          <style>{`
            .fact {
              font-size: 20px;
              color: var(--color-gold-warm, #D4AF88);
              line-height: 1.6;
              font-family: Georgia, 'Times New Roman', serif;
              opacity: 0.9;
              position: absolute;
            }

            /* Desktop - absolutely positioned and scattered */
            @media (min-width: 769px) {
              .fact-1 {
                top: 180px;
                left: 5%;
                max-width: 400px;
                transform: rotate(-2deg);
              }

              .fact-2 {
                top: 280px;
                right: 8%;
                max-width: 380px;
                transform: rotate(1deg);
              }

              .fact-3 {
                top: 460px;
                left: 10%;
                max-width: 420px;
                transform: rotate(-1deg);
              }
            }

            /* Mobile - relatively positioned and stacked */
            @media (max-width: 768px) {
              .facts-container {
                display: flex;
                flex-direction: column;
                gap: 24px;
                margin-top: 40px;
              }

              .fact {
                position: relative;
                max-width: 100%;
                transform: none;
                left: auto;
                right: auto;
                top: auto;
              }
            }
          `}</style>
        </div>
        <StoriesHub stories={storyData} />

        {/* Instagram Link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          I have a dance account too ->
          <a
            href="https://www.instagram.com/serranoio.dance/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "var(--color-gold-light, #E8D4A8)",
              fontSize: "20px",
              fontFamily: "Georgia, 'Times New Roman', serif",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                fill="currentColor"
              />
            </svg>
            <span>@serranoio.dance</span>
          </a>
        </div>
      </div>
    }
    /* Before home features */
    /* After home features */
    /* Before doc footer */
    //   beforeDocFooter={<div>beforeDocFooter</div>}
    //   /* After doc footer */
    //   afterDocFooter={<div>afterDocFooter</div>}
    /* Doc page front */
    //   beforeDoc={<div>beforeDoc</div>}
    /* Doc page end */
    //   afterDoc={<div>afterDoc</div>}
    /* Doc content front */
    //   beforeDocContent={<div>beforeDocContent</div>}
    /* Doc content end */
    //   afterDocContent={<div>afterDocContent</div>}
    /* Before the nav bar */
    //   beforeNav={<div>beforeNav</div>}
    /* Before the title of the nav bar in the upper left corner */
    //   beforeNavTitle={<span>😄</span>}
    /* Nav bar title */
    //   navTitle={<div>Custom Nav Title</div>}
    /* After the title of the nav bar in the upper left corner */
    //   afterNavTitle={<div>afterNavTitle</div>}
    /* The right corner of the nav menu */
    //   afterNavMenu={<div>afterNavMenu</div>}
    /* Above the left sidebar */
    //   beforeSidebar={<div>beforeSidebar</div>}
    /* Below the left sidebar */
    //   afterSidebar={<div>afterSidebar</div>}
    /* Above the right outline column */
    //   beforeOutline={<div>beforeOutline</div>}
    /* Below the outline column on the right */
    //   afterOutline={<div>afterOutline</div>}
    /* Top of the entire page */
    //   top={<div>top</div>}
    /* Bottom of the entire page */
    /* Custom MDX components */
    components={{ p: (props) => <p {...props} className="my-4 leading-7" /> }}
  />
);
// Custom Home Page
// Custom 404 page
const NotFoundLayout = () => <div>404</div>;

export default {
  ...Theme,
  Layout,
  NotFoundLayout,
  Hero,
};

// Custom Search Component
const MySearch = () => (
  <div className="my-search">
    <Search />
  </div>
);
export { MySearch as Search };
// Export YouTubeEmbed and VideoPlayer for use in markdown
export { YouTubeEmbed };
export { VideoPlayer };
// re-export
export * from "rspress/theme";
