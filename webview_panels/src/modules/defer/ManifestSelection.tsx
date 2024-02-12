import { CardText, FormGroup, Input, Label, Select } from "@uicore";
import { useState } from "react";
import {
  executeRequestInAsync,
  executeRequestInSync,
} from "../app/requestExecutor";
import classes from "./defer.module.scss";
import { ManifestPathType } from "./constants";
import { ManifestSelectionProps } from "./types";

export const ManifestSelection = ({
  dbtProjectRoot,
  manifestPathType,
  manifestPathForDeferral,
  projectIntegrations,
  dbt_core_integration_id,
  setDeferState,
  setProjectIntegrations,
}: ManifestSelectionProps): JSX.Element => {
  const [showManifestError, setShowManifestError] = useState(false);

  const handleLocalManifestPathChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = event.target;
    if (!value.endsWith("manifest.json")) {
      setShowManifestError(false);
    } else {
      setShowManifestError(true);
    }
    setDeferState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onLocalManifestBlur = async () => {
    if (!showManifestError) {
      const response = await executeRequestInSync("updateDeferConfig", {
        config: [
          {
            key: "manifestPathForDeferral",
            value: manifestPathForDeferral,
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
            className={classes.pathInput}
            value={manifestPathForDeferral}
            onChange={handleLocalManifestPathChange}
            onBlur={onLocalManifestBlur}
          />
        )}
      </div>
      {showManifestError && (
        <CardText>
          The path should indicate the folder where the manifest.json file is
          located
        </CardText>
      )}
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
