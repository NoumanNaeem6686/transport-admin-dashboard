import axiosInstance from "@/config/axios";


export async function getAllWorkWithUsEntries({
    query,
    page,
    limit,
}: {
    query?: string;
    page?: number;
    limit?: number;
}) {
    try {
        const response = await axiosInstance.get("/api/work-with-us", {
            params: { query, page, limit },
        });
        console.log("🚀 ~ response:", response.data)

        return { data: response.data.entries, meta: response.data.meta };
    } catch (error: any) {
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Fetch work failed";
        // console.error("Fetch users failed:", errorMessage);
        return { error: errorMessage };
    }
}
export async function deleteWorkWithUsEntry(entryId: any) {
    try {
        const response = await axiosInstance.delete(`/api/work-with-us/${entryId}`);
        console.log("Deleted entry:", response.data.entry);
        return { data: response.data.entry };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || "Failed to delete entry";
        console.log("Delete entry failed:", errorMessage);
        return { error: errorMessage };
    }
}

