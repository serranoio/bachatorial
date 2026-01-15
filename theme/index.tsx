import Theme, { Search } from "rspress/theme";
import { Hero } from "./CustomHero";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { VideoPlayer } from "./VideoPlayer";
import { StoriesHub } from "./StoriesHub";
import { storyData } from "./storyData";
import { GlobalAnimatedBackground } from "./GlobalAnimatedBackground";

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
                top: 320px;
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
