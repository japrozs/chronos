import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BiX } from "react-icons/bi";

interface InfoModalProps {
    open: boolean;
    setOpen: any;
}

export const InfoModal: React.FC<InfoModalProps> = ({ open, setOpen }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-y-auto"
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 max-h-screen transition-opacity bg-black bg-opacity-25" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:mt-48 sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            style={{ backgroundColor: "#0D1117" }}
                            className="z-20 inline-block border border-gray-700 overflow-hidden text-left align-bottom transition-all transform  rounded shadow-xl sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
                        >
                            <div
                                className="flex items-center px-4 py-2 border-b border-gray-800"
                                style={{
                                    backgroundColor: "#161B22",
                                }}
                            >
                                <p className="text-gray-200 text-sm font-medium">
                                    About Chronos
                                </p>
                                <BiX
                                    onClick={() => setOpen(false)}
                                    className="ml-auto mr-0 text-gray-400 cursor-pointer text-2xl hover:text-blue-500"
                                />
                            </div>
                            <div className="py-3 px-4">
                                <p className="text-gray-400 text-sm">
                                    Chronos is a tiny search engine that indexes
                                    your files from all your cloud apps so that
                                    you can search all of the from one place.
                                </p>
                                <p className="mt-2 text-gray-400 text-sm">
                                    A new desktop app and a mobile app is also
                                    about to be launched, but as I'm the only
                                    one working on this, it's going to take some
                                    time.
                                </p>
                                <p className="mt-2 text-gray-400 text-sm">
                                    Contact me at{" "}
                                    <a
                                        target={"_blank"}
                                        href="mailto:sainijaproz@gmail.com"
                                        className="menlo text-blue-500"
                                    >
                                        sainijaproz@gmail.com
                                    </a>
                                </p>

                                <p className="text-center mt-10 text-gray-400 text-sm">
                                    Chronos is made with{" "}
                                    <span style={{ fontFamily: "Helvetica" }}>
                                        ❤️
                                    </span>{" "}
                                    by{" "}
                                    <a
                                        className="text-blue-500 hover:underline focus:outline-none"
                                        href="https://japroz.me"
                                        target="_blank"
                                    >
                                        @japrozs
                                    </a>
                                </p>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
