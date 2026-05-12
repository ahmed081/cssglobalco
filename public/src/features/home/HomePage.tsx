import { pages } from "../../data/pages.data";
import { DynamicPage } from "../pageRenderer/DynamicPage";

export default function HomePage() {
  return <DynamicPage page={pages.home} />;
}
