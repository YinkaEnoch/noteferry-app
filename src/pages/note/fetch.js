import { ValidateNoteTitle } from "Utils/index";
import FetchPage from "Components/FetchPage";

const FetchNote = () => {
  const fetchApiUrl = process.env.NEXT_PUBLIC_NOTES_SERVER_URL;

  return (
    <FetchPage
      pageTitle="Fetch Note"
      inputLabel="Note Title"
      inputPlaceholder="Netlify API Key"
      btnText="Fetch Note"
      btnLoadingText="Fetching Note..."
      Validator={ValidateNoteTitle}
      fetchApiUrl={fetchApiUrl}
      pageUrl="note"
      footerText="Every notes are automatically deleted 1hour after last update."
    />
  );
};

export default FetchNote;
