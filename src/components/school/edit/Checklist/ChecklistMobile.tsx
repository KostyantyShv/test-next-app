"use client";

import React, { useRef, useEffect } from "react";
import { ChecklistItemProps } from "./types";
import { Icon } from "./Icon";

const CHEVRON_DOWN = (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const DROPDOWN_ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STATUS_SUCCESS_ICON = (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
  </svg>
);

const STATUS_ERROR_ICON = (
  <svg viewBox="0 0 15 15" fill="currentColor">
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
    />
  </svg>
);

const STATUS_INCOMPLETE_ICON = (
  <svg viewBox="0 0 448 512" fill="currentColor">
    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
  </svg>
);

export interface ChecklistMobileProps {
  items: { title: string; items: ChecklistItemProps[] }[];
  expandedSections: string[];
  toggleSection: (title: string) => void;
  expandedItems: string[];
  toggleItem: (title: string) => void;
  showIncomplete: boolean;
  setShowIncomplete: (v: boolean) => void;
  showIssues: boolean;
  setShowIssues: (v: boolean) => void;
  expandMode: "all" | "incomplete" | "issues" | "completed" | null;
  handleExpand: (mode: "all" | "incomplete" | "issues" | "completed") => void;
  completeItem: (sectionTitle: string, itemTitle: string) => Promise<void>;
  getVisibleItems: (sectionItems: ChecklistItemProps[]) => ChecklistItemProps[];
  processingItem: string | null;
  setProcessingItem: (v: string | null) => void;
  isExpandMenuOpen: boolean;
  setIsExpandMenuOpen: (v: boolean) => void;
}

function getSectionStatusBadge(sectionItems: ChecklistItemProps[]) {
  const incomplete = sectionItems.filter((i) => i.button?.type === "add").length;
  const issues = sectionItems.filter((i) => i.button?.type === "fix").length;
  const unresolved = incomplete + issues;

  if (unresolved === 0) {
    return (
      <div className="status-badge status-success">
        {STATUS_SUCCESS_ICON}
        All done
      </div>
    );
  }
  if (issues === 0) {
    return (
      <div className="status-badge status-incomplete">
        {STATUS_INCOMPLETE_ICON}
        {incomplete} incomplete
      </div>
    );
  }
  const txt =
    incomplete > 0 && issues > 0
      ? `${incomplete} inc, ${issues} iss`
      : issues > 0
        ? `${issues} issues`
        : `${incomplete} incomplete`;
  return (
    <div className="status-badge status-error">
      {STATUS_ERROR_ICON}
      {txt}
    </div>
  );
}

function ProgressCircle({ progress }: { progress: number }) {
  const r = 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  return (
    <div className="progress-circle">
      <svg viewBox="0 0 20 20">
        <circle className="bg" cx="10" cy="10" r={r} strokeWidth={2} />
        <circle
          className="progress"
          cx="10"
          cy="10"
          r={r}
          strokeWidth={2}
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={offset}
        />
      </svg>
    </div>
  );
}

export const ChecklistMobile: React.FC<ChecklistMobileProps> = ({
  items,
  expandedSections,
  toggleSection,
  expandedItems,
  toggleItem,
  showIncomplete,
  setShowIncomplete,
  showIssues,
  setShowIssues,
  expandMode,
  handleExpand,
  completeItem,
  getVisibleItems,
  processingItem,
  setProcessingItem,
  isExpandMenuOpen,
  setIsExpandMenuOpen,
}) => {
  const expandDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (expandDropdownRef.current && !expandDropdownRef.current.contains(e.target as Node)) {
        setIsExpandMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [setIsExpandMenuOpen]);

  const allItems = items.flatMap((s) => s.items);
  const incompleteCount = allItems.filter((i) => i.button?.type === "add").length;
  const issuesCount = allItems.filter((i) => i.button?.type === "fix").length;
  const total = allItems.length || 1;
  const optionsPercent = (incompleteCount / total) * 100;
  const issuesPercent = (issuesCount / total) * 100;

  const expandMenuLabel =
    expandMode === "all"
      ? "Collapse All"
      : expandMode === "incomplete"
        ? "Collapse Incomplete"
        : expandMode === "issues"
          ? "Collapse Issues"
          : expandMode === "completed"
            ? "Collapse Completed"
            : "Expand";

  return (
    <div className="checklist-mobile">
      <div className="mobile-screen">
        <div className="mobile-header">
          <h1 className="header-title">Listing Checklist</h1>
          <div className="progress-container">
            <div className="progress-bar-wrapper">
              <div className="progress-bar">
                <div
                  className="progress-fill-options"
                  style={{ width: `${optionsPercent}%` }}
                />
                <div
                  className="progress-fill-issues"
                  style={{ width: `${issuesPercent}%` }}
                />
              </div>
            </div>
            <div className="counts-container">
              <span className="options-count">{incompleteCount} incomplete</span>
              <span className="issues-count">{issuesCount} issues</span>
            </div>
          </div>
          <div className="controls-container">
            <div className="toggle-controls-group">
              <div className="view-toggle">
                <span className="toggle-label">Incomplete</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={showIncomplete}
                    onChange={() => setShowIncomplete(!showIncomplete)}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>
              <div className="view-toggle">
                <span className="toggle-label">Issues</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={showIssues}
                    onChange={() => setShowIssues(!showIssues)}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>
            <div className="expand-dropdown" ref={expandDropdownRef}>
              <button
                type="button"
                className="expand-button"
                onClick={() => setIsExpandMenuOpen(!isExpandMenuOpen)}
              >
                {expandMenuLabel}
                {DROPDOWN_ARROW}
              </button>
              <div className={`expand-menu ${isExpandMenuOpen ? "active" : ""}`}>
                <button
                  type="button"
                  className="expand-all"
                  onClick={() => {
                    handleExpand("all");
                    setIsExpandMenuOpen(false);
                  }}
                >
                  {expandMode === "all" ? "Collapse All" : "Expand All"}
                </button>
                <button
                  type="button"
                  className="expand-incomplete"
                  onClick={() => {
                    handleExpand("incomplete");
                    setIsExpandMenuOpen(false);
                  }}
                >
                  {expandMode === "incomplete" ? "Collapse Incomplete" : "Expand Incomplete"}
                </button>
                <button
                  type="button"
                  className="expand-issues"
                  onClick={() => {
                    handleExpand("issues");
                    setIsExpandMenuOpen(false);
                  }}
                >
                  {expandMode === "issues" ? "Collapse Issues" : "Expand Issues"}
                </button>
                <button
                  type="button"
                  className="expand-completed"
                  onClick={() => {
                    handleExpand("completed");
                    setIsExpandMenuOpen(false);
                  }}
                >
                  {expandMode === "completed" ? "Collapse Completed" : "Expand Completed"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sections-container">
          {items.map((section) => {
            const visibleItems = getVisibleItems(section.items);
            if (visibleItems.length === 0) return null;

            const isExpanded = expandedSections.includes(section.title);
            const completed = section.items.filter((i) => i.status === "completed").length;
            const totalInSection = section.items.length || 1;
            const progress = (completed / totalInSection) * 100;

            return (
              <div
                key={section.title}
                className={`section ${isExpanded ? "expanded" : ""}`}
              >
                <div
                  className="section-header"
                  onClick={() => toggleSection(section.title)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleSection(section.title);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="header-left">
                    <div className="section-title">{section.title}</div>
                    {getSectionStatusBadge(section.items)}
                  </div>
                  <div className="header-right">
                    <ProgressCircle progress={progress} />
                    <div className="chevron">{CHEVRON_DOWN}</div>
                  </div>
                </div>
                <div className="section-content">
                  {visibleItems.map((item) => {
                    const itemExpanded = expandedItems.includes(item.title);
                    const itemKey = `${section.title}:${item.title}`;
                    const isProcessing = processingItem === itemKey;

                    return (
                      <div
                        key={item.title}
                        className={`checklist-item ${itemExpanded ? "expanded" : ""}`}
                      >
                        <div
                          className="item-header"
                          onClick={() => toggleItem(item.title)}
                          onKeyDown={(e) => {
                            if (e.target !== e.currentTarget) return;
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleItem(item.title);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="item-icon">
                            <Icon name={item.icon} />
                          </div>
                          <div className="item-title">{item.title}</div>
                          <div className="item-expand-icon">{CHEVRON_DOWN}</div>
                        </div>
                        <div className="item-action-row">
                          {item.status === "completed" ? (
                            <div className="item-status status-completed">
                              {STATUS_SUCCESS_ICON}
                              Completed
                            </div>
                          ) : item.button?.type === "add" ? (
                            <button
                              type="button"
                              className="add-button item-button"
                              disabled={!!isProcessing}
                              onClick={async (e) => {
                                e.stopPropagation();
                                setProcessingItem(itemKey);
                                try {
                                  await completeItem(section.title, item.title);
                                } finally {
                                  setProcessingItem(null);
                                }
                              }}
                            >
                              {isProcessing ? "Processing..." : item.button?.label}
                            </button>
                          ) : item.button?.type === "fix" ? (
                            <button
                              type="button"
                              className="fix-button item-button"
                              disabled={!!isProcessing}
                              onClick={async (e) => {
                                e.stopPropagation();
                                setProcessingItem(itemKey);
                                try {
                                  await completeItem(section.title, item.title);
                                } finally {
                                  setProcessingItem(null);
                                }
                              }}
                            >
                              {isProcessing ? "Processing..." : item.button?.label}
                            </button>
                          ) : null}
                        </div>
                        <div className="item-details">
                          {item.issues ? (
                            <div className="issue-description">
                              Some of your{" "}
                              {item.title.toLowerCase().replace(" issues", "")} are
                              incomplete or missing important details. Please
                              review and complete the following:
                              <div className="affected-items">
                                {item.issues.map((issue, idx) => (
                                  <div key={idx} className="affected-group">
                                    <div className="affected-title">
                                      {issue.title}
                                    </div>
                                    <div className="missing-fields">
                                      {issue.missing.map((field, fieldIdx) => (
                                        <span
                                          key={fieldIdx}
                                          className="keyword-highlight"
                                        >
                                          {field}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="option-description">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
