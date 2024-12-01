import React from "react";
import { History } from "@/components/History";
import Error from "@/components/error";
import { getUserHistory } from "@/actions/user.action";

const HistoryPage = async ({
    searchParams,
}: {
    searchParams: { page?: number | string; limit?: number | string };
}) => {
    // Convert page and limit to numbers, default to 1 and 10 if not provided
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;

    const { error, data, meta } = await getUserHistory({ page, limit });

    if (error || !meta) return <Error error={error || "No Data found"} />;

    return <History data={data || []} meta={meta} />;
};

export default HistoryPage;
