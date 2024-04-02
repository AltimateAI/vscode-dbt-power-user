import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "@modules/app/requestExecutor";
import { Input, Drawer, LoadingButton, Stack, Button } from "@uicore";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { panelLogger } from "@modules/logger";

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
  const [isCopied, setIsCopied] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ShareRequest>({
    resolver: yupResolver(schema),
  });

  const handleViewClick = () => {
    // TODO handle this properly
    const parts = sharedUrl.split("/");
    executeRequestInAsync("dbtdocsview:render", {
      shareId: parts[parts.length - 1],
    });
  };

  const handleShare = async (data: ShareRequest) => {
    try {
      const result = (await executeRequestInSync("share:dbtdocs", {
        ...data,
      })) as { shareUrl: string; shareId: string };
      setSharedUrl(result.shareUrl);
    } catch (err) {
      panelLogger.error("error while creating dbt share url", err);
    }
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
          <Stack>
            <Button onClick={handleViewClick}>View</Button>
            <CopyToClipboard text={sharedUrl}>
              <Button
                title={`${
                  !isCopied ? "Copy to clipboard" : "Copied to clipboard"
                }`}
                onClick={() => setIsCopied(true)}
              >
                {isCopied ? "Copied" : "Copy"}
              </Button>
            </CopyToClipboard>
          </Stack>
        </div>
      ) : (
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
      )}
    </Drawer>
  );
};

export default ShareDbtDocsButton;
