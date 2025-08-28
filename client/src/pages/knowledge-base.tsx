import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function KnowledgeBase() {
  const [selectedType, setSelectedType] = useState("all");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [formData, setFormData] = useState({
    type: "faq",
    title: "",
    content: "",
    tags: "",
  });

  const { data: items = [], isLoading } = useQuery<any[]>({
    queryKey: ['/api/knowledge-base/default-store'],
  });

  const addItemMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/knowledge-base", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/knowledge-base/default-store'] });
      setIsAddingItem(false);
      setFormData({ type: "faq", title: "", content: "", tags: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItemMutation.mutate({
      storeId: "default-store",
      type: formData.type,
      title: formData.title,
      content: formData.content,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      isActive: true,
    });
  };

  const filteredItems = selectedType === "all" ? items : items.filter((item: any) => item.type === selectedType);

  const mockItems = [
    { id: "1", type: "faq", title: "Shipping Policy", content: "We offer free shipping on orders over $50...", tags: ["shipping"], isActive: true },
    { id: "2", type: "faq", title: "Return Policy", content: "Items can be returned within 30 days...", tags: ["returns"], isActive: true },
    { id: "3", type: "size_guide", title: "Size Chart - Shoes", content: "US 8 = EU 39 = UK 6...", tags: ["sizes", "shoes"], isActive: true },
    { id: "4", type: "policy", title: "Privacy Policy", content: "We value your privacy...", tags: ["privacy"], isActive: true },
  ];

  const displayItems = items.length > 0 ? filteredItems : mockItems.filter(item => selectedType === "all" || item.type === selectedType);

  return (
    <div className="min-h-screen" data-testid="knowledge-base-page">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4" data-testid="knowledge-base-header">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground" data-testid="page-title">Knowledge Base</h2>
            <p className="text-muted-foreground" data-testid="page-description">
              Manage your FAQ, policies, and AI training content
            </p>
          </div>
          <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-item">
                <i className="fas fa-plus mr-2"></i>
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="add-item-dialog">
              <DialogHeader>
                <DialogTitle>Add Knowledge Base Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Type</label>
                  <select 
                    value={formData.type} 
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm bg-background"
                    data-testid="select-type"
                  >
                    <option value="faq">FAQ</option>
                    <option value="policy">Policy</option>
                    <option value="size_guide">Size Guide</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    data-testid="input-title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Content</label>
                  <Textarea 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={4}
                    required
                    data-testid="textarea-content"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Tags (comma-separated)</label>
                  <Input 
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="shipping, returns, policy"
                    data-testid="input-tags"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddingItem(false)} data-testid="button-cancel">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={addItemMutation.isPending} data-testid="button-save">
                    {addItemMutation.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Content */}
      <div className="p-6" data-testid="knowledge-base-content">
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6" data-testid="knowledge-base-filters">
          <span className="text-sm font-medium text-foreground">Filter by type:</span>
          {["all", "faq", "policy", "size_guide"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedType === type
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
              data-testid={`filter-${type}`}
            >
              {type === "all" ? "All" : type.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="knowledge-base-loading">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="knowledge-base-items">
            {displayItems.map((item: any) => (
              <Card key={item.id} data-testid={`knowledge-item-${item.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg" data-testid={`item-title-${item.id}`}>{item.title}</CardTitle>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'faq' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'policy' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`} data-testid={`item-type-${item.id}`}>
                      {item.type.replace("_", " ")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3" data-testid={`item-content-${item.id}`}>
                    {item.content}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3" data-testid={`item-tags-${item.id}`}>
                      {item.tags.map((tag: string, index: number) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground" data-testid={`item-tag-${item.id}-${index}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`} data-testid={`item-status-${item.id}`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="text-primary hover:text-primary/80 text-sm" data-testid={`button-edit-${item.id}`}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="text-destructive hover:text-destructive/80 text-sm" data-testid={`button-delete-${item.id}`}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {displayItems.length === 0 && !isLoading && (
          <div className="text-center py-12" data-testid="empty-state">
            <i className="fas fa-book text-4xl text-muted-foreground mb-4"></i>
            <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedType === "all" 
                ? "Get started by adding your first knowledge base item."
                : `No ${selectedType.replace("_", " ")} items found. Try a different filter.`
              }
            </p>
            <Button onClick={() => setIsAddingItem(true)} data-testid="button-add-first-item">
              <i className="fas fa-plus mr-2"></i>
              Add Your First Item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
