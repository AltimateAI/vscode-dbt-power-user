import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { executeRequestInSync } from "@modules/app/requestExecutor";
import { Input, Drawer, LoadingButton } from "@uicore";
import { useState } from "react";

const schema = Yup.object({
  name: Yup.string().optional(),
  description: Yup.string().optional(),
}).required();

interface ShareRequest {
  description?: string;
  name?: string;
}

const ShareDbtDocsButton = (): JSX.Element => {
  const [sharedUrl, setSharedUrl] = useState("");
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ShareRequest>({
    resolver: yupResolver(schema),
  });

  const handleShare = async (data: ShareRequest) => {
    const result = (await executeRequestInSync("share:dbtdocs", {
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
          name="name"
          render={({ field: { onChange } }) => (
            <Input
              type="textarea"
              onChange={onChange}
              placeholder="Enter a title"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange } }) => (
            <Input
              type="textarea"
              onChange={onChange}
              placeholder="@john Please check this out!"
            />
          )}
        />

        <LoadingButton loading={isSubmitting} color="primary" type="submit">
          Discuss
        </LoadingButton>
      </form>
    </Drawer>
  );
};

export default ShareDbtDocsButton;
