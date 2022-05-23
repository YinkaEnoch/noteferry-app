import { atom } from "jotai";

export const NoteData = atom({
  noteTitle: "",
  noteBody: "",
  createdAt: "",
  updatedAt: "",
});
