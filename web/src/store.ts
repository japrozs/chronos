import { create, StateCreator } from "zustand";
import { GetFilesQuery, useGetFilesQuery } from "./generated/graphql";

interface FileSlice {
    files: GetFilesQuery["getFiles"];
    setFiles: (files: GetFilesQuery["getFiles"]) => void;
}

const createfilesSlice: StateCreator<FileSlice> = (set) => ({
    files: [],
    setFiles: (files: GetFilesQuery["getFiles"]) => {
        set({
            files,
        });
    },
});

export const useStore = create<FileSlice>()((...a) => ({
    ...createfilesSlice(...a),
}));
