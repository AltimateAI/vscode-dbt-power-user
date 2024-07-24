// @ts-nocheck
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { FunctionComponent, h } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import { IssueClosedIcon, IssueOpenIcon, PRIcon } from "./icons";

const defaultMaxCount = 13;

export const AllItems: FunctionComponent<{
  items: ReadonlyArray<unknown>;
}> = ({ items: rawItems }) => {
  return (
    <div>
      <IssueOpenIcon /> Entered sql:{" "}
      <pre>
        <code>{rawItems.sql}</code>
      </pre>
    </div>
  );
};

const Item: FunctionComponent<{
  item: unknown;
  hide(): void;
  showRepo: boolean;
}> = ({ item, showRepo, hide }) => (
  <div className="item-row">
    <div className="item-main">
      <div className="item-state">
        {item.pull_request ? (
          <PRIcon />
        ) : item.closed_at ? (
          <IssueClosedIcon />
        ) : (
          <IssueOpenIcon />
        )}
      </div>
      <div style={{ flex: "auto", flexBasis: 0 }}>
        {showRepo && <RepoLabel url={item.repository_url} />}
        <a href={item.html_url} className="title">
          {item.title}
        </a>
        {item.labels.map((label) => (
          <Label label={label} key={label.id} />
        ))}
      </div>
      <div className="user">
        {item.assignees?.map((user) => <Avatar user={user} key={user.id} />)}
      </div>
    </div>

    <div className="status">
      <span>
        #{item.number} opened {new Date(item.created_at).toLocaleDateString()}{" "}
        by {item.user.login}
      </span>
      <span style={{ flex: 1 }} />
      <ul className="actions">
        <li>
          <a role="button" onClick={hide}>
            Hide
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const RepoLabel: FunctionComponent<{ url: string }> = ({ url }) => {
  const match = /.+\/(.+\/.+)$/.exec(url);
  return match ? (
    <a href={`https://github.com/${match[1]}`} className="repo title">
      {match[1]}
    </a>
  ) : null;
};

const Label: FunctionComponent<{
  label: unknown;
}> = ({ label }) => (
  <span
    className="label"
    key={label.id}
    style={{ backgroundColor: `#${label.color}` }}
  >
    <a style={{ color: getContrastColor(label.color) }}>{label.name}</a>
  </span>
);

const Avatar: FunctionComponent<{
  user: unknown;
}> = ({ user }) => (
  <a key={user.id} href={user.html_url}>
    <img src={user.avatar_url} width="20" height="20" alt={`@${user.login}`} />
  </a>
);

const CollapseButton: FunctionComponent<{
  n: number;
  collapsed: boolean;
  setCollapsed: (fn: boolean) => void;
}> = ({ collapsed, setCollapsed, n }) =>
  collapsed ? (
    <span className="more" onClick={() => setCollapsed(false)}>
      ▼ Show {n - defaultMaxCount} More
    </span>
  ) : (
    <span className="less" onClick={() => setCollapsed(true)}>
      ▲ Show Less
    </span>
  );

function getContrastColor(color: string): string {
  // Color algorithm from https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
  const r = Number.parseInt(color.substr(0, 2), 16);
  const g = Number.parseInt(color.substr(2, 2), 16);
  const b = Number.parseInt(color.substr(4, 2), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "black" : "white";
}
