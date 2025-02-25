
import { Navigation } from "@/components/layout/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function Activity() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: likes, error: likesError } = await supabase
        .from('likes')
        .select('*, posts(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (likesError) throw likesError;
      return likes;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pb-16 md:ml-64 md:pb-0">
        <div className="bg-white border-b sticky top-0 z-10 backdrop-blur-lg bg-white/80">
          <h1 className="p-4 text-xl font-semibold">Activity</h1>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : activities?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No activity yet
            </div>
          ) : (
            <div className="space-y-4">
              {activities?.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12">
                    <img
                      src={activity.posts?.image_url}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      You liked a post
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </p>
                  </div>
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
