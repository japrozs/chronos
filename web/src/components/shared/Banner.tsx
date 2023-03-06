import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface BannerProps {}

export const Banner: React.FC<BannerProps> = ({}) => {
    const [open, setOpen] = useState(true);
    return (
        <>
            {open && (
                <>
                    <div className="hidden mid:block mid:flex items-center py-2.5 mid:bg-scribbles-blue border-b border-gray-900">
                        <div className="mx-auto flex items-center">
                            <span className="font-semibold mr-2 text-primary-color">
                                ✨ New!
                            </span>
                            <p className="font-medium">
                                Chronos is free for the first 1000 users
                            </p>
                        </div>
                        <RxCross2
                            onClick={() => setOpen(false)}
                            className="block mr-2 text-white cursor-pointer text-2xl hover:text-primary-color"
                        />
                    </div>
                    <div className="block mid:hidden py-2.5 border-b border-gray-800">
                        <p className="mx-auto px-2 font-medium">
                            <span className="font-semibold mr-2 text-primary-color">
                                ✨ New!
                            </span>
                            Chronos is free for the first 1000 users
                        </p>
                    </div>
                </>
            )}
        </>
    );
};
