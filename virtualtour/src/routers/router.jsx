import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import Main from "../pages/main";
import Not from "../pages/404";
import Profile from "../pages/profile";
import Gallery from "../pages/gallery";
import Id from "../pages/gallery/Id.jsx";
import Buy from "../pages/buy";

export const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "profile",

    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "buy",

    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Buy />
      </Suspense>
    ),
  },
  {
    path: "gallery/:tokenId",

    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Id />
      </Suspense>
    ),
  },
  {
    path: "gallery",

    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Gallery />
      </Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Not />
      </Suspense>
    ),
  },
]);
