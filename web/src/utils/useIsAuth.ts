import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
    const { data, loading } = useMeQuery();
    const router: NextRouter = useRouter();
    useEffect(() => {
        if (["/login", "/signup", "/"].includes(router.pathname)) {
            if (!loading && data?.me != null) {
                router.push("/app");
            }
            return;
        }
        if (router.pathname == "/verify") {
            if (!loading && data?.me != null && data.me.verified) {
                router.push("/app");
            }
        }
        if (!loading && !data?.me) {
            router.replace("/");
        } else if (
            !loading &&
            data?.me &&
            typeof router.query.code !== "string" &&
            !data?.me?.verified
        ) {
            router.replace("/verify", undefined, { shallow: false });
        }
    }, [loading, data, router]);
};
