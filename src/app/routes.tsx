import { createBrowserRouter } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Programs } from "./pages/Programs";
import { Join } from "./pages/Join";
import { Contact } from "./pages/Contact";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0E27] pt-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">Page not found</p>
        <a
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/programs",
    element: (
      <Layout>
        <Programs />
      </Layout>
    ),
  },
  {
    path: "/join",
    element: (
      <Layout>
        <Join />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);
