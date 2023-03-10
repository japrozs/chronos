import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { ResultCard } from "@/components/ui/ResultCard";
import { Spinner } from "@/components/shared/Spinner";
import {
    GetFilesQuery,
    RegularFileFragment,
    useGetFilesQuery,
    useMeQuery,
} from "@/generated/graphql";
import { search, SearchResult } from "@/utils/search";
import { useIsAuth } from "@/utils/useIsAuth";
import { BiQuestionMark } from "react-icons/bi";
import { InfoModal } from "@/components/modals/InfoModal";
import { Navbar } from "@/components/shared/Navbar";
import { Meta } from "@/components/shared/Meta";
import { LOCAL_STORAGE_KEY } from "@/constants";
import { useStore } from "@/store";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
    useIsAuth();
    const [query, setQuery] = useState("");
    const { data: me } = useMeQuery();
    const [dataLoading, setDataLoading] = useState(false);
    const { data, loading } = useGetFilesQuery();
    // const { files, setFiles } = useStore();
    // console.log("files ::", files);
    // let data: GetFilesQuery["getFiles"] = [];
    // if (files.length == 0) {
    //     const { data: filesData, loading } = useGetFilesQuery();
    //     data = filesData?.getFiles || [];
    // } else {
    //     data = files;
    // }
    // setFiles(data);

    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({});

    useEffect(() => {
        const fn = setTimeout(() => {
            if (query.trim().length == 0) {
                setResult({});
            } else if (data !== undefined) {
                setResult(search(query, data.getFiles));
            }
        }, 1000);
        return () => clearTimeout(fn);
    }, [query]);

    return (
        <>
            <Meta title="Chronos" />
            <Navbar me={me?.me} />
            <div className="p-6 w-full">
                {loading ? (
                    <div className="pt-20">
                        <Spinner />
                    </div>
                ) : (
                    <div className=" max-w-4xl  mx-auto">
                        <div className="flex items-center bg-dark-compliment-hovered rounded-md border border-gray-800">
                            <FiSearch className="text-2xl text-gray-500 m-4" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full h-full py-3 bg-transparent focus:outline-none placeholder-gray-500 text-gray-300"
                                placeholder="what do you want to find?"
                            />
                            <RxCross2
                                onClick={() => setQuery("")}
                                className={`${
                                    query.length == 0
                                        ? "opacity-0"
                                        : "opacity-100"
                                } text-2xl text-gray-500 m-4 cursor-pointer transition-all hover:text-primary-color`}
                            />
                        </div>
                        {data !== undefined &&
                        Object.keys(result).length != 0 &&
                        query.trim().length != 0 ? (
                            <div className="transition-all">
                                <p className="mt-6 text-smol font-medium text-gray-700">
                                    {(result as SearchResult).results.length}{" "}
                                    result
                                    {(result as SearchResult).results.length !=
                                        1 && "s"}{" "}
                                    in {(result as SearchResult).time}ms{" "}
                                </p>
                                {(result as SearchResult).results.length !=
                                0 ? (
                                    (result as SearchResult).results.map(
                                        (file: RegularFileFragment, idx) => (
                                            <>
                                                <ResultCard
                                                    file={file}
                                                    key={idx}
                                                />
                                                <hr className="border-t border-gray-900" />
                                            </>
                                        )
                                    )
                                ) : (
                                    <div className="mt-20 select-none flex flex-col justify-center">
                                        <img
                                            className="w-60 h-auto mx-auto"
                                            src="/images/no_results.png"
                                        />
                                        <p className="mx-auto text-center mt-5 font-medium text-gray-600">
                                            No search results found
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="mt-20 flex flex-col justify-center select-none">
                                <img
                                    className="w-60 h-auto mx-auto"
                                    src="/images/type_something.png"
                                />
                                <p className="mx-auto text-center mt-1 font-medium text-gray-600">
                                    Search for google docs, github repos
                                    <br /> and much more ...
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <InfoModal open={open} setOpen={setOpen} />
            <div
                onClick={() => setOpen(true)}
                className="flex items-center justify-center bg-black w-10 h-10 rounded-full z-10 absolute bottom-2 right-2 border border-gray-800 cursor-pointer group"
            >
                <BiQuestionMark className="text-gray-200 transition-all duration-75 text-xl group-hover:text-primary-color" />
            </div>
        </>
    );
};

export default App;
