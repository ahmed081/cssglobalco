import {pages} from "../../data/pages.data";
import {DynamicPage} from "../pageRenderer/DynamicPage";

export default function PricingPage() {
    return <DynamicPage page={pages.pricing}/>;
}
