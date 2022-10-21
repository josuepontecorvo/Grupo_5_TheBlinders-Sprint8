import { Chart } from "../components/Chart";
import { ContentRowCenter } from "../components/ContentRowCenter";
import { ContentRowDb } from "../components/ContentRowDb";

function ContentWrapper() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <ContentRowDb />
                <ContentRowCenter />
                <Chart />
            </div>
        </div>
    );
}

export default ContentWrapper