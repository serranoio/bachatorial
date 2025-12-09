import Theme, { Search } from 'rspress/theme';


// Show all props below
const Layout = () => (
    <Theme.Layout
      /* Before home hero */
      beforeHero={<div>beforeHero</div>}
      /* After home hero */
      afterHero={<div>

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <video src="bachata.mp4" controls width="320" height="240">
        Your browser does not support the video tag.
    </video>
</div>


      </div>}
      /* Before home features */
      beforeFeatures={<div>beforeFeatures</div>}
      /* After home features */
      afterFeatures={<div>afterFeatures</div>}
      /* Before doc footer */
      beforeDocFooter={<div>beforeDocFooter</div>}
      /* After doc footer */
      afterDocFooter={<div>afterDocFooter</div>}
      /* Doc page front */
      beforeDoc={<div>beforeDoc</div>}
      /* Doc page end */
      afterDoc={<div>afterDoc</div>}
      /* Doc content front */
      beforeDocContent={<div>beforeDocContent</div>}
      /* Doc content end */
      afterDocContent={<div>afterDocContent</div>}
      /* Before the nav bar */
      beforeNav={<div>beforeNav</div>}
      /* Before the title of the nav bar in the upper left corner */
      beforeNavTitle={<span>😄</span>}
      /* Nav bar title */
      navTitle={<div>Custom Nav Title</div>}
      /* After the title of the nav bar in the upper left corner */
      afterNavTitle={<div>afterNavTitle</div>}
      /* The right corner of the nav menu */
      afterNavMenu={<div>afterNavMenu</div>}
      /* Above the left sidebar */
      beforeSidebar={<div>beforeSidebar</div>}
      /* Below the left sidebar */
      afterSidebar={<div>afterSidebar</div>}
      /* Above the right outline column */
      beforeOutline={<div>beforeOutline</div>}
      /* Below the outline column on the right */
      afterOutline={<div>afterOutline</div>}
      /* Top of the entire page */
      top={<div>top</div>}
      /* Bottom of the entire page */
      bottom={<div>bottom</div>}
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
};

// Custom Search Component
const MySearch = () => (
  <div className="my-search">
    <Search />
  </div>
);
export { MySearch as Search };
// re-export
export * from 'rspress/theme';