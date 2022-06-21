import { ValidateDocTitle } from "Utils/index";
import FetchPage from "Components/FetchPage";

const FetchDoc = () => {
  const fetchApiUrl = process.env.NEXT_PUBLIC_DOCS_SERVER_URL;

  return (
    <FetchPage
      pageTitle="Retrieve Doc"
      inputLabel="Doc Title"
      inputPlaceholder="Laughing meme"
      btnText="Fetch Doc"
      btnLoadingText="Fetching Doc..."
      Validator={ValidateDocTitle}
      fetchApiUrl={fetchApiUrl}
      pageUrl="doc"
      footerText="All documents are automatically deleted 15minutes after upload."
    />
  );
};

export default FetchDoc;
