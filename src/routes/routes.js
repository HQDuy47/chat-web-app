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
];

// Private routes
const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
