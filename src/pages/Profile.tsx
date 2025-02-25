
import { Navigation } from "@/components/layout/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['profile-posts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pb-16 md:ml-64 md:pb-0">
        <div className="bg-white border-b sticky top-0 z-10 backdrop-blur-lg bg-white/80">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Profile</h1>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full" />
                <h2 className="mt-4 font-semibold">{profile?.username}</h2>
              </div>

              <div>
                <h3 className="font-medium mb-4">Posts</h3>
                {isLoadingPosts ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : posts?.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No posts yet
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1">
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
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
}
