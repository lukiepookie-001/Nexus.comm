
import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Post = Database['public']['Tables']['posts']['Row'];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts, isLoading } = useQuery({
    queryKey: ['search-posts', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('caption', `%${searchQuery}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pb-16 md:ml-64 md:pb-0">
        <div className="bg-white border-b sticky top-0 z-10 backdrop-blur-lg bg-white/80">
          <h1 className="p-4 text-xl font-semibold">Search</h1>
          <div className="px-4 pb-4">
            <input
              type="search"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : posts?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No posts found
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {posts?.map((post) => (
                <div key={post.id} className="aspect-square">
                  <img
                    src={post.image_url}
                    alt={post.caption || "Post"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
}
