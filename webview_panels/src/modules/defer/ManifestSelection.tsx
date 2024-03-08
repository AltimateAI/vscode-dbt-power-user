import { FormGroup, IconButton, Input, Label, Select, Spinner } from "@uicore";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "../app/requestExecutor";
import classes from "./defer.module.scss";
import { ManifestPathType } from "./constants";
import { ManifestSelectionProps } from "./types";
import { panelLogger } from "@modules/logger";
import { RefreshIcon } from "@assets/icons";

export const ManifestSelection = ({
  dbtProjectRoot,
  manifestPathType,
  manifestPathForDeferral,
  projectIntegrations,
  dbtCoreIntegrationId,
  setDeferState,
  setProjectIntegrations,
  fetchingProjectIntegrations,
}: ManifestSelectionProps): JSX.Element => {
  const updateConfigWithManifestPath = async (path: string) => {
    panelLogger.info("updating defer config for manifest path", path);
    const response = await executeRequestInSync("updateDeferConfig", {
      config: [
        {
          key: "manifestPathForDeferral",
          value: path,
          isPreviewFeature: true,
        },
        {
          key: "manifestPathType",
          value: manifestPathType,
        },
      ],
      projectRoot: dbtProjectRoot,
    });
    if (!(response as { updated: boolean }).updated) {
      setDeferState((prevState) => ({
        ...prevState,
        manifestPathForDeferral: "",
        manifestPathType: ManifestPathType.EMPTY,
      }));
    }
  };

  const handleManifestPathTypeChange = async (option: ManifestPathType) => {
    if (option === ManifestPathType.REMOTE) {
      await setProjectIntegrations();
      if (dbtCoreIntegrationId > 0) {
        await executeRequestInSync("updateDeferConfig", {
          config: [
            {
              key: "manifestPathType",
              value: option,
            },
          ],
          projectRoot: dbtProjectRoot,
        });
      }
    }
    if (option === ManifestPathType.LOCAL) {
      if (manifestPathForDeferral) {
        await executeRequestInSync("updateDeferConfig", {
          config: [
            {
              key: "manifestPathType",
              value: option,
            },
          ],
          projectRoot: dbtProjectRoot,
        });
      }
    }
    setDeferState((prevState) => ({
      ...prevState,
      manifestPathType: option,
    }));
  };

  const handleIntegrationSelect = async (selectedOption: {
    label: string;
    value: number;
  }) => {
    await executeRequestInSync("testRemoteManifest", {
      dbtCoreIntegrationId: selectedOption.value,
    });
    executeRequestInAsync("showInformationMessage", {
      infoMessage: `Project integration connected successfully!`,
    });
    await executeRequestInSync("updateDeferConfig", {
      config: [
        {
          key: "manifestPathType",
          value: manifestPathType,
        },
        {
          key: "dbtCoreIntegrationId",
          value: selectedOption.value,
        },
      ],
      projectRoot: dbtProjectRoot,
    });
    setDeferState((prevState) => ({
      ...prevState,
      dbtCoreIntegrationId: selectedOption.value,
    }));
  };

  const selectDirectoryForManifest = async () => {
    panelLogger.info("selecting directory for manifest");
    const result = await executeRequestInSync("selectDirectoryForManifest", {});
    panelLogger.info("selected directory for manifest", result);
    const { path } = result as { path: string };
    setDeferState((prevState) => ({
      ...prevState,
      manifestPathForDeferral: path,
    }));

    await updateConfigWithManifestPath(path);
  };

  const handleRefresh = () => setProjectIntegrations(true);

  return (
    <FormGroup check className={classes.pathSelection}>
      <div className={classes.pathSelectionRow}>
        <Label
          check
          for="localManifestPathRadio"
          sm={2}
          className={classes.title}
          style={{ whiteSpace: "nowrap" }}
        >
          <Input
            type="radio"
            id="localManifestPathRadio"
            checked={manifestPathType === ManifestPathType.LOCAL}
            onClick={() => handleManifestPathTypeChange(ManifestPathType.LOCAL)}
          />
          Local Path to manifest folder
        </Label>
        {manifestPathType === ManifestPathType.LOCAL && (
          <Input
            id="localManifestPath"
            name="manifestPathForDeferral"
            placeholder=""
            type="text"
            readOnly
            className={classes.pathInput}
            value={manifestPathForDeferral}
            onClick={selectDirectoryForManifest}
            title="Click to select folder"
          />
        )}
      </div>
      <div className={classes.pathSelectionRow}>
        <Label
          check
          for="manifestPathRadio"
          sm={2}
          className={classes.title}
          style={{ whiteSpace: "nowrap" }}
          onClick={() => handleManifestPathTypeChange(ManifestPathType.REMOTE)}
        >
          <Input
            type="radio"
            id="manifestPathRadio"
            checked={manifestPathType === ManifestPathType.REMOTE}
          />
          DataPilot dbt Integration
        </Label>
        {manifestPathType === ManifestPathType.REMOTE &&
          projectIntegrations && (
            <>
              <Select
                options={projectIntegrations}
                className={classes.pathInput}
                value={projectIntegrations.find(
                  (i) => i.value === dbtCoreIntegrationId,
                )}
                onChange={(newValue) =>
                  handleIntegrationSelect(
                    newValue as { label: string; value: number },
                  )
                }
              />
              <IconButton
                title="Refetch Project Integrations"
                onClick={handleRefresh}
                color="outline"
                className={classes.refreshBtn}
                disabled={fetchingProjectIntegrations}
              >
                {!fetchingProjectIntegrations ? <RefreshIcon /> : <Spinner />}
              </IconButton>
            </>
          )}
      </div>
    </FormGroup>
  );
};
