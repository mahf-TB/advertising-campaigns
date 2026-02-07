import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AddPage from "./pages/AddPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import Home from "./pages/Home";

function About() {
  return (
    <main style={{ padding: 20 }}>
      <h1>À propos</h1>
      <p>Page À propos.</p>
    </main>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <Home />
      </RootLayout>
    ),
  },
  {
    path: "/campains",
    element: (
      <RootLayout>
        <AddPage />
      </RootLayout>
    ),
  },
  {
    path: "/campains/:id",
    element: (
      <RootLayout>
        <DetailPage />
      </RootLayout>
    ),
  },
  {
    path: "/campains/:id/edit",
    element: (
      <RootLayout>
        <EditPage />
      </RootLayout>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export { router };

export default router;
