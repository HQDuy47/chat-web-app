import { Fragment } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import DefaultLayout from "./layout/index";

function App() {
  interface RouteType {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType | null;
  }

  const renderRoute = (route: RouteType, index: number) => {
    const Page = route.component;
    let Layout = route.layout || DefaultLayout;

    if (route.layout === null) {
      Layout = Fragment;
    }

    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    );
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => renderRoute(route, index))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
