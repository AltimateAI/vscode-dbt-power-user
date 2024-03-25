import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { Button, Input, Drawer } from "@uicore";
import { useState } from "react";

const schema = Yup.object({
  comment: Yup.string().optional(),
}).required();

interface ShareRequest {
  comment?: string;
}
const ShareDocumentationButton = () => {
  const [sharedUrl, setSharedUrl] = useState("");
  const { control, handleSubmit } = useForm<ShareRequest>({
    resolver: yupResolver(schema),
  });

  const handleShare = async (data: ShareRequest) => {
    const result = (await executeRequestInSync("share:docs", {
      ...data,
    })) as string;
    setSharedUrl(result);
  };
  return (
    <Drawer
      buttonProps={{ outline: true }}
      buttonText={<>Share</>}
      title="Share"
    >
      {sharedUrl ? (
        <div>
          <h4>Share this url:</h4>
          <p>{sharedUrl}</p>
        </div>
      ) : null}
      <form onSubmit={handleSubmit(handleShare)}>
        <Controller
          control={control}
          name="comment"
          render={({ field: { onChange } }) => (
            <Input
              type="textarea"
              onChange={onChange}
              placeholder="@john Please check this out!"
            />
          )}
        />

        <Button color="primary" type="submit">
          Share
        </Button>
      </form>
    </Drawer>
  );
};

export default ShareDocumentationButton;
