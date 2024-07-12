import Header1 from "@/components/headers/Header1";
import About from "@/components/otherPages/about/About";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "About",
  description: "About Page",
};
export default function AboutPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <About />
      </main>
    </>
  );
}
