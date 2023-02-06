import "./globals.css";
import NavBar from "./NavBar";
import Provider from "./provider";

interface PageProp {
  children: React.ReactNode;
}

export default function RootLayout({ children }: PageProp) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Provider>
          <div id="profile-post-view" className="" />
          <div className="w-screen h-screen grid grid-rows-[min-content_1fr]">
            <NavBar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
