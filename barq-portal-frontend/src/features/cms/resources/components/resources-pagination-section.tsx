import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useResourcesListingControllerReadQuery } from "../../../../../mock-sdk/modules/resources-listing.gen";
import { useResourcesPaginationControllerReadQuery } from "../../../../../mock-sdk/modules/resources-pagination.gen";

export default function ResourcesPaginationSection() {
  const [pageSize, setPageSize] = useState(9);
  const [page, setPage] = useState(1);
  const { data: listing } = useResourcesListingControllerReadQuery({ query: { page, pageSize } } as any);
  const { data: pagination } = useResourcesPaginationControllerReadQuery({ query: { total: listing?.total ?? 0, pageSize } } as any);
  const totalPages = pagination?.pages ?? 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagination</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Page size</span>
            <Input type="number" min={1} max={27} value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value || "1", 10))} className="w-24" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage(1)}>First</Button>
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
            <span className="text-sm">{page} / {totalPages}</span>
            <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
            <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage(totalPages)}>Last</Button>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Total items: {listing?.total ?? 0}</div>
      </CardContent>
    </Card>
  );
}


