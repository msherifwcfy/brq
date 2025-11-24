import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import NewsroomArticleForm from "./NewsroomArticleForm";
import { DataTable } from "@/shared/components/ui/data-table";
import { useNewsroomArticlesColumns } from "../columns/newsroom-articles-columns";

export default function NewsroomArticlesSection() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const columns = useNewsroomArticlesColumns({
    onEdit: setEditingArticle,
    onDelete: () => {},
  });

  const mockData: any[] = [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Newsroom Articles</CardTitle>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Article
          </Button>
        </CardHeader>
        <CardContent>
          {mockData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No articles yet. Click "Add Article" to create one.
            </div>
          ) : (
            <DataTable columns={columns} data={mockData} />
          )}
        </CardContent>
      </Card>

      {(isCreating || editingArticle) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isCreating ? "Create Article" : "Edit Article"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NewsroomArticleForm
              article={editingArticle}
              onClose={() => {
                setIsCreating(false);
                setEditingArticle(null);
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
