import { FormGroup, Input, Label, Select } from "@uicore";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "../app/requestExecutor";
import classes from "./defer.module.scss";
import { ManifestPathType } from "./constants";
import { ManifestSelectionProps } from "./types";
import { panelLogger } from "@modules/logger";

export const ManifestSelection = ({
  dbtProjectRoot,
  manifestPathType,
  manifestPathForDeferral,
  projectIntegrations,
  dbt_core_integration_id,
  setDeferState,
  setProjectIntegrations,
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
      if (dbt_core_integration_id > 0) {
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
    const response = await executeRequestInSync("testRemoteManifest", {
      dbt_core_integration_id: selectedOption.value,
    });
    const data = response as {
      url: string;
      dbt_core_integration_file_id: number;
    };
    if (data.url === "" && data.dbt_core_integration_file_id === -1) {
      executeRequestInAsync("showInformationMessage", {
        infoMessage: `No remote manifest file present for dbt core integration: ${selectedOption.label}`,
      });
      return;
    }
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
          key: "dbt_core_integration_id",
          value: selectedOption.value,
        },
      ],
      projectRoot: dbtProjectRoot,
    });
    setDeferState((prevState) => ({
      ...prevState,
      dbt_core_integration_id: selectedOption.value,
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
            <Select
              options={projectIntegrations}
              className={classes.pathInput}
              value={projectIntegrations.find(
                (i) => i.value === dbt_core_integration_id,
              )}
              onChange={(newValue) =>
                handleIntegrationSelect(
                  newValue as { label: string; value: number },
                )
              }
            />
          )}
      </div>
    </FormGroup>
  );
};
