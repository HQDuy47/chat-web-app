import CalendarPage from "../pages/CalendarPage";
import ChatPage from "../pages/ChatPage";
import DocumentsPage from "../pages/DocumentsPage";
import OffersPage from "../pages/OffersPage";
import PropertiesPage from "../pages/PropertiesPage";
import SettingsPage from "../pages/SettingsPage";

// Public routes
const publicRoutes = [
  { path: "/", component: ChatPage },
  { path: "/room/:id", component: ChatPage },
  { path: "/calendar", component: CalendarPage },
  { path: "/documents", component: DocumentsPage },
  { path: "/offers", component: OffersPage },
  { path: "/properties", component: PropertiesPage },
  { path: "/settings", component: SettingsPage },
  // { path: "/", component: HomePage },
  // { path: "/", component: HomePage },
  // { path: "/", component: WelcomePage, layout: null },
  //   { path: "/landing", component: LandingPage },
  //   { path: "/story", component: StoryPage },
  //   { path: "/product", component: ProductPage },
  //   { path: "/*", component: NotFoundPage, layout: null },
  //   { path: "/admin", component: AdminPage, layout: HeaderOnly },
];

// Private routes
const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
