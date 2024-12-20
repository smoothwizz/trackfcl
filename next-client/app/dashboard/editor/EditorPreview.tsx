import React from "react";
import MarkdownPreview from "../components/MarkdownPreview";

type Props = {
  content: string;
};

const EditorPreview = ({ content }: Props) => {
  return (
    <div className={previewStyles} id={"pdfExport"}>
      <MarkdownPreview content={content} />
    </div>
  );
};

const previewStyles = `w-full max-w-none prose dark:prose-li:marker:text-gray-300 dark:prose-invert my-6 rounded-sm bg-white dark:bg-slate-700 prose-pre:bg-amber-100 prose-pre:dark:bg-slate-600 prose-pre:dark:text-white prose-pre:text-gray-700 prose-hr:dark:border-slate-500`;

export default EditorPreview;
