import React from "react";
import ReactMarkdown from "react-markdown";
import TextareaResizable from "../Forms/TextareaResizable";

type Props = {
  contentEdited: string;
  setContentEdited: React.Dispatch<React.SetStateAction<string>>;
  pdfAreaId: string;
};

const FileEditor = ({ contentEdited, setContentEdited, pdfAreaId }: Props) => {
  return (
    <article className="file">
      <div className="file__preview" id={pdfAreaId}>
        <ReactMarkdown>{contentEdited}</ReactMarkdown>
      </div>

      <div className="file__editor">
        <TextareaResizable
          name={"fileContent"}
          label={"Content"}
          value={contentEdited}
          handleChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
            setContentEdited(e.currentTarget.value)
          }
        ></TextareaResizable>
      </div>
    </article>
  );
};

export default FileEditor;
