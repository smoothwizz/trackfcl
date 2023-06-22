import { FileMetadata } from "@/types/markdown";
import React from "react";
import Button from "../Forms/Button";
import { TabListItem, TAB_LIST } from "./constants";
import DashboardActions from "./DashboardActions";
import File from "../file/File";

type Props = {
  isSelectedFileParsed: boolean;
  isExporting: boolean;
  selectedTab: TabListItem;
  metadata: FileMetadata;
  contentEdited: string;
  pdfSettings: { areaName: string; fileName: string };
  fileNameEdited: string;
  setContentEdited: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabListItem>>;
  handleOpenFile: () => Promise<void>;
  handleCreateFile: () => void;
  handleFileNameChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleMetadataChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleExportToMD: (fileName: string) => void;
  handleExportToPDF: () => void;
};

const DashboardOverview = (props: Props) => {
  const {
    handleOpenFile,
    handleCreateFile,
    isExporting,
    isSelectedFileParsed,
    selectedTab,
    setSelectedTab,
    fileNameEdited,
    handleFileNameChange,
    metadata,
    handleMetadataChange,
    contentEdited,
    setContentEdited,
    pdfSettings,
    handleExportToMD,
    handleExportToPDF,
  } = props;

  const dashboardActionsProps = {
    fileNameEdited,
    handleOpenFile,
    handleCreateFile,
    handleExportToMD,
  };

  const fileProps = {
    selectedTab,
    isExporting,
    fileNameEdited,
    contentEdited,
    setContentEdited,
    metadata,
    pdfAreaName: pdfSettings.areaName,
    handleFileNameChange,
    handleMetadataChange,
  };

  return (
    <div className="dashboard-container">
      <DashboardActions {...dashboardActionsProps} />

      {isSelectedFileParsed && (
        <div>
          {renderTabs()}
          {selectedTab === "export" && renderExportButtons()}
          <File {...fileProps} />
        </div>
      )}
    </div>
  );

  function renderExportButtons(): React.ReactNode {
    return (
      <div className="dashboard-container__file-controls">
        <Button
          variant="primary"
          handleClick={() => handleExportToPDF()}
          label={"Export to .pdf"}
        />
      </div>
    );
  }

  function renderTabs() {
    return (
      <nav className="tabs">
        <ul>
          {TAB_LIST.map((tab) => {
            return (
              <li
                key={tab.id}
                className={`tab ${
                  tab.id === selectedTab ? "tab--is-active" : ""
                }`}
              >
                <button onClick={() => setSelectedTab(tab.id)}>
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
};

export default DashboardOverview;
