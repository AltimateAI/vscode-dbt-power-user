import { NoNotebooksIcon } from "@assets/icons";
import { executeRequestInAsync } from "@modules/app/requestExecutor";
import { Button } from "@uicore";

export const NoNotebooks = (): JSX.Element => {
  const handleClick = () => {
    executeRequestInAsync("openNewNotebook", {});
  };
  return (
    <div className="w-[326px] h-[244px] flex-col justify-center items-center gap-5 flex">
      <div className="flex justify-center">
        <NoNotebooksIcon />
      </div>
      <div className="self-stretch h-[66px] flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch text-center text-[#e8e8e8] text-xl font-medium font-['Lexend'] leading-normal">
          No Notebooks Have Been Saved!
        </div>
        <div className="self-stretch text-center text-[#c4cad2] text-sm font-normal font-['Lexend'] leading-[16.80px]">
          Explaining content text for how to use notebooks
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleClick}>Create Notebook</Button>
      </div>
    </div>
  );
};
