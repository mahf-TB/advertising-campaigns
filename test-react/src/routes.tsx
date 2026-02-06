import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";

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
    path: "/about",
    element: <About />,
  },
]);

export { router };

export default router;
