import { OptionType, Label, Select, Stack, Drawer, DrawerRef } from "@uicore";
import {
  Languages,
  Persona,
  DefaultLanguage,
  DefaultPersona,
} from "../docGenerator/constants";
import { ActionMeta } from "react-select";
import useDocumentationContext from "@modules/documentationEditor/state/useDocumentationContext";
import { updateUserInstructions } from "@modules/documentationEditor/state/documentationSlice";
import { panelLogger } from "@modules/logger";
import { sendTelemetryEvent } from "../telemetry";
import { TelemetryEvents } from "@telemetryEvents";
import { useEffect, useRef } from "react";

const DocGeneratorSettings = (): JSX.Element => {
  const {
    dispatch,
    state: { userInstructions },
  } = useDocumentationContext();
  const drawerRef = useRef<DrawerRef | null>(null);

  useEffect(() => {
    drawerRef.current?.open();
  }, []);
  const handleChange = (value: unknown, meta: ActionMeta<unknown>) => {
    if (!meta.name) {
      return;
    }
    panelLogger.info("updating user instructions", meta.name, value);
    dispatch(
      updateUserInstructions({ [meta.name]: (value as OptionType).value }),
    );
    sendTelemetryEvent(TelemetryEvents["DocumentationEditor/SettingsUpdate"], {
      field: meta.name,
      value: (value as OptionType).value,
    });

    localStorage.setItem(
      "userInstructions",
      JSON.stringify({
        ...userInstructions,
        [meta.name]: (value as OptionType).value,
      }),
    );
  };

  const onOpen = () => {
    sendTelemetryEvent(TelemetryEvents["DocumentationEditor/SettingsOpen"]);
  };

  return (
    <Drawer title="Help" onOpen={onOpen} ref={drawerRef}>
      <Stack direction="column">
        <h5>Configure settings for document generation</h5>
        <Stack direction="column">
          <Label>
            Language
            <Select
              name="language"
              defaultValue={{
                label: userInstructions.language ?? DefaultLanguage,
                value: userInstructions.language ?? DefaultLanguage,
              }}
              onChange={handleChange}
              options={Languages.map((l) => ({ label: l, value: l }))}
            />
          </Label>
          <Label>
            Persona
            <Select
              name="persona"
              defaultValue={{
                label: userInstructions.persona ?? DefaultPersona,
                value: userInstructions.persona ?? DefaultPersona,
              }}
              onChange={handleChange}
              options={Persona.map((l) => ({ label: l, value: l }))}
            />
          </Label>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default DocGeneratorSettings;
