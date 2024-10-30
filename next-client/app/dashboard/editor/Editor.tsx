"use client";

import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import Timer from "@/app/components/Timer";
import { useAtom } from "jotai";
import {
  atom_content,
  atom_contentEdited,
  atom_frontMatter,
  atom_hasChanges,
  atom_timerSettings,
} from "@/app/atoms/atoms";
import { useSearchParams } from "next/navigation";
import { useDocumentTitle } from "@/app/hooks/use-document-title";
import { useState, useEffect } from "react";
import { PICKER_OPTIONS } from "./EditorEmpty";
import { toast } from "react-toastify";
import router from "next/router";
import { StatusResponse } from "@/app/services/save-utils";
import matter from "gray-matter";
import Loading from "@/app/components/Loading";
import TemplateSelectionModal from "../templates/TemplateSelectionModal";
import { RESET } from "jotai/utils";

export default function Editor() {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [timerSettings] = useAtom(atom_timerSettings);
  const searchParams = useSearchParams();
  const isTimerVisible = searchParams.has("timer");
  const [frontMatter] = useAtom(atom_frontMatter);
  const fileTitle = frontMatter.title || "File";
  const [content] = useAtom(atom_content);
  const [contentEdited, setContentEdited] = useAtom(atom_contentEdited);
  const [, setFrontMatter] = useAtom(atom_frontMatter);
  const [, setContent] = useAtom(atom_content);
  const [hasChanges] = useAtom(atom_hasChanges);
  const [, setHasChanges] = useAtom(atom_hasChanges);
  const [isTemplateSelectModalVisible, setIsTemplateSelectModalVisible] =
    useState(false);

  const [_, setDocumentTitle] = useDocumentTitle("Hermes Notes");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDocumentTitle(fileTitle);
  }, [fileTitle, setDocumentTitle]);

  function handleNewFile() {
    setIsLoading(true);
    setFrontMatter({
      fileName: "file",
      title: "File",
      description: "",
      tags: "",
    });
    setContent("# Title");
    setContentEdited("# Title");
    setIsLoading(false);
  }

  async function handleOpenFile() {
    try {
      const [fileHandle] = await window.showOpenFilePicker(PICKER_OPTIONS);
      const file = await fileHandle.getFile();

      setIsLoading(true);
      await parseFile(file);

      toast.success("File has been loaded");
    } catch (error) {
      toast.error("File could not be loaded");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function parseFile(file: File): Promise<StatusResponse> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        const result = await loadFileData(reader, file.name);
        resolve(result);
      };

      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  function loadFileData(reader: FileReader, fileName: string) {
    const fileContent = String(reader.result);
    const { data: frontMatter, content } = matter(fileContent);

    let setterPromise = new Promise<StatusResponse>(function (resolve, reject) {
      try {
        setFrontMatter({
          fileName: fileName || "",
          title: frontMatter?.title || "",
          description: frontMatter?.description || "",
          tags: frontMatter?.tags ? frontMatter?.tags.join(",") : "",
        });
        setContent(content);
        setContentEdited(content);

        resolve({
          status: "error",
          message: "File has been loaded successfully",
        });
      } catch (error) {
        reject({
          status: "error",
          message: error,
        });
      }
    });

    return setterPromise;
  }

  function handleSelectTemplate() {
    setIsTemplateSelectModalVisible(true);
  }

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mb-8">
      {isTimerVisible && <Timer settings={timerSettings} />}

      {isTemplateSelectModalVisible && (
        <TemplateSelectionModal
          isOpen={isTemplateSelectModalVisible}
          handleClose={() => {
            setIsTemplateSelectModalVisible(false);
            setIsLoading(false);
          }}
        ></TemplateSelectionModal>
      )}

      <EditorHeader
        content={content}
        setContent={setContent}
        contentEdited={contentEdited}
        setContentEdited={setContentEdited}
        frontMatter={frontMatter}
        setFrontMatter={setFrontMatter}
        hasChanges={hasChanges}
        actions={{
          handleNewFile,
          handleOpenFile,
          handleSelectTemplate
        }}
      />
      <EditorContent
        content={content}
        setContent={setContent}
        contentEdited={contentEdited}
        setContentEdited={setContentEdited}
        frontMatter={frontMatter}
        setFrontMatter={setFrontMatter}
        hasChanges={hasChanges}
        setHasChanges={setHasChanges}
      />
    </div>
  );
}
