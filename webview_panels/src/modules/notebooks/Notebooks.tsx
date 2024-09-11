import NotebooksList from "./NotebooksList";
// import PreConfiguredNotebooksList from "./PreConfiguredNotebooksList";

const Notebooks = (): JSX.Element => {
  return (
    <div>
      <NotebooksList type="preconfigured" />
      <NotebooksList type="saved" />
    </div>
  );
};

export default Notebooks;
