import type { Meta } from "@storybook/react";
import PerspectiveViewer from "./PerspectiveViewer";
import { TableData } from "@finos/perspective";

const meta = {
  title: "PerspectiveViewer",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta;

export default meta;

export const DefaultPerspectiveViewerView = {
  render: (): JSX.Element => {
    return (
      <PerspectiveViewer
        columnNames={[
          "customer_id",
          "first_name",
          "last_name",
          "first_order",
          "most_recent_order",
          "number_of_orders",
          "customer_lifetime_value",
        ]}
        columnTypes={[
          "Integer",
          "Text",
          "Text",
          "Date",
          "Date",
          "Integer",
          "Number",
        ]}
        data={
          [
            {
              customer_id: 1,
              first_name: '{"first_name": "John", "last_name": "P."}',
              last_name: "P.",
              first_order: "2018-01-01",
              most_recent_order: "2018-02-10",
              number_of_orders: 2,
              customer_lifetime_value: 33,
            },
            {
              customer_id: 2,
              first_name: '{"first_name": "John", "last_name": "P',
              last_name: "M.",
              first_order: "2018-01-11",
              most_recent_order: "2018-01-11",
              number_of_orders: 1,
              customer_lifetime_value: 23,
            },
            {
              customer_id: 3,
              first_name: "",
              last_name: "P.",
              first_order: "2018-01-02",
              most_recent_order: "2018-03-11",
              number_of_orders: 3,
              customer_lifetime_value: 65,
            },
            {
              customer_id: 6,
              first_name:
                '["Hello, world!","🌟","🚀","😊","🍕","❤️","📚","🎉","🌍","✨","💡","🔥","🕺","💻","🎵","🎨","⚽","🎮","🧩","🖼️","🧠"]',
              last_name:
                '["Hello, world!","🌟","🚀","😊","🍕","❤️","📚","🎉","🌍","✨","💡","🔥","🕺","💻","🎵","🎨","⚽","🎮","🧩","🖼️","🧠"]',
              first_order: "2018-02-19",
              most_recent_order: "2018-02-19",
              number_of_orders: 1,
              customer_lifetime_value: 8,
            },
            {
              customer_id: 7,
              first_name:
                "MartinMartinMartinMartinMartinMartinMartinMartinMartinMartinMartinMartinMartinMartinMartin",
              last_name: '{"last_name": { "last_name": "R."}}',
              first_order: "2018-01-14",
              most_recent_order: "2018-01-14",
              number_of_orders: 1,
              customer_lifetime_value: 26,
            },
            {
              customer_id: 8,
              first_name: "{}",
              last_name: "R.",
              first_order: "2018-01-29",
              most_recent_order: "2018-03-12",
              number_of_orders: 2,
              customer_lifetime_value: 45,
            },
            {
              customer_id: 9,
              first_name: "Jennifer",
              last_name: "F.",
              first_order: "2018-03-17",
              most_recent_order: "2018-03-17",
              number_of_orders: 1,
              customer_lifetime_value: 30,
            },
            {
              customer_id: 11,
              first_name: "Fred",
              last_name: "S.",
              first_order: "2018-03-23",
              most_recent_order: "2018-03-23",
              number_of_orders: 1,
              customer_lifetime_value: 3,
            },
            {
              customer_id: 12,
              first_name: "Amy",
              last_name: "D.",
              first_order: "2018-03-03",
              most_recent_order: "2018-03-03",
              number_of_orders: 1,
              customer_lifetime_value: 4,
            },
            {
              customer_id: 13,
              first_name: "Kathleen",
              last_name: "M.",
              first_order: "2018-03-07",
              most_recent_order: "2018-03-07",
              number_of_orders: 1,
              customer_lifetime_value: 26,
            },
            {
              customer_id: 16,
              first_name: "Amanda",
              last_name: "H.",
              first_order: "2018-02-02",
              most_recent_order: "2018-02-02",
              number_of_orders: 1,
              customer_lifetime_value: 12,
            },
            {
              customer_id: 18,
              first_name: "Johnny",
              last_name: "K.",
              first_order: "2018-02-27",
              most_recent_order: "2018-02-27",
              number_of_orders: 1,
              customer_lifetime_value: 29,
            },
            {
              customer_id: 19,
              first_name: "Virginia",
              last_name: "F.",
              first_order: "2018-03-16",
              most_recent_order: "2018-03-16",
              number_of_orders: 1,
              customer_lifetime_value: 3,
            },
            {
              customer_id: 20,
              first_name: "Anna",
              last_name: "A.",
              first_order: "2018-01-23",
              most_recent_order: "2018-01-23",
              number_of_orders: 1,
              customer_lifetime_value: 15,
            },
            {
              customer_id: 21,
              first_name: "Willie",
              last_name: "H.",
              first_order: "2018-03-28",
              most_recent_order: "2018-03-28",
              number_of_orders: 1,
              customer_lifetime_value: 22,
            },
            {
              customer_id: 22,
              first_name: "Sean",
              last_name: "H.",
              first_order: "2018-01-26",
              most_recent_order: "2018-03-01",
              number_of_orders: 3,
              customer_lifetime_value: 52,
            },
            {
              customer_id: 25,
              first_name: "Victor",
              last_name: "H.",
              first_order: "2018-01-17",
              most_recent_order: "2018-03-20",
              number_of_orders: 2,
              customer_lifetime_value: 24,
            },
            {
              customer_id: 26,
              first_name: "Aaron",
              last_name: "R.",
              first_order: "2018-02-11",
              most_recent_order: "2018-03-08",
              number_of_orders: 2,
              customer_lifetime_value: 8,
            },
            {
              customer_id: 27,
              first_name: "Benjamin",
              last_name: "B.",
              first_order: "2018-02-21",
              most_recent_order: "2018-04-04",
              number_of_orders: 2,
              customer_lifetime_value: 27,
            },
            {
              customer_id: 28,
              first_name: "Lisa",
              last_name: "W.",
              first_order: "2018-02-04",
              most_recent_order: "2018-02-04",
              number_of_orders: 1,
              customer_lifetime_value: 3,
            },
            {
              customer_id: 30,
              first_name: "Christina",
              last_name: "W.",
              first_order: "2018-03-02",
              most_recent_order: "2018-03-14",
              number_of_orders: 2,
              customer_lifetime_value: 57,
            },
            {
              customer_id: 31,
              first_name: "Jane",
              last_name: "G.",
              first_order: "2018-02-17",
              most_recent_order: "2018-02-17",
              number_of_orders: 1,
              customer_lifetime_value: 18,
            },
          ] as unknown as TableData
        }
      />
    );
  },
};
