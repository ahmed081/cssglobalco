import { pages } from "../../data/pages.data";
import { DynamicPage } from "../pageRenderer/DynamicPage";

export default function ServicesPage() {
  return <DynamicPage page={pages.services} />;
}
