import type { Meta } from "@storybook/react";
import { useState } from "react";
import * as Icons from "./index";

const meta = {
  title: "UiToolKit/Images",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

export const Default = {
  render: (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredIcons = searchTerm
      ? Object.keys(Icons).filter((name) =>
          name.toLowerCase().includes(searchTerm)
        )
      : Object.keys(Icons);

    return (
      <div style={{ overflowY: "auto", height: "100vh" }}>
        <h2>Icons</h2>
        <div style={{ margin: "20px 0" }}>
          <input
            type="text"
            placeholder="Search icons..."
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            onChange={handleSearch}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "20px",
            color: "#333"
          }}
        >
          {filteredIcons.map((name) => {
            const IconComponent = Icons[name as keyof typeof Icons];
            return (
              <div key={name} style={{ textAlign: "center" }}>
                <IconComponent width="48px" height="48px" />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
};
