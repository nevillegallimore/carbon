import * as React from "react";

export interface NoteProps {
  noteContent: object;
  width?: number;
  inlineControl?: React.ReactNode;
  title?: string;
  name: string;
  createdDate: string;
  status?: {
    text: string;
    timeStamp: string;
  };
}

declare function Note(props: NoteProps): JSX.Element;

export default Note;
