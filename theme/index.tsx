import Theme, { Search } from 'rspress/theme';
import { HeroVideo } from './HeroVideo';
import { Roadmap } from './RoadmapResponsive';
import { Hero } from './CustomHero';
import { YouTubeEmbed } from './YouTubeEmbed';
import { VideoPlayer } from './VideoPlayer';

const roadmapSteps = [
  {
    step: 1,
    title: "Break limiting beliefs. You can dance.",
    description: "What if you told a baby to do multiplication when they don't even know how to do addition? This is how everyone is with dancing. We see people do multiplication on the dance floor while we don't know how to do basic addition, causing us extreme anxiety. This problem ends today."
  },
  {
    step: 2,
    title: "Learn body isolations",
    description: "There is no dancing yet! Embrace the spiritual act of connecting with your body. You're going to move parts of your body that you never knew you could <3"
  },
  {
    step: 3,
    title: "Apply the body isolations to the dance style, Bachata",
    description: "Understanding the isolated isolations makes you feel like any move is in reach :)"
  }
];

// Show all props below
const Layout = () => (
    <Theme.Layout
      /* Before home hero */
     afterHero={<div></div>}
      
      /* After home hero */
      beforeHero={
        <div>
          <HeroVideo videoSrc="bachata.mp4" />
          <Roadmap steps={roadmapSteps} />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '40px 0 80px 0'
          }}>
            <a href="/guide/lesson" style={{ textDecoration: 'none' }}>
              <button
                type="button"
                style={{
                  padding: '20px 48px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: '#ff4757',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff6b7a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 71, 87, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff4757';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 71, 87, 0.4)';
                }}
              >
                Learn now!
              </button>
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
    //   bottom={<div>bottom</div>}
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
export * from 'rspress/theme';