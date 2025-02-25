
import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { MessageCircle, Heart, Share2, Bookmark } from "lucide-react";

const posts = [
  {
    id: 1,
    user: {
      name: "Sarah Anderson",
      avatar: "https://i.pravatar.cc/150?img=1",
      username: "@sarahanderson",
    },
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    likes: 234,
    caption: "Beautiful sunset view! 🌅 #photography #nature",
    category: "Photography",
    comments: 12,
  },
  // Add more mock posts here
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pb-16 md:ml-64 md:pb-0">
        {/* Stories Section */}
        <div className="bg-white border-b sticky top-0 z-10 backdrop-blur-lg bg-white/80">
          <div className="overflow-x-auto flex gap-4 p-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5"
              >
                <div className="w-full h-full rounded-full border-2 border-white bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6 p-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border shadow-sm animate-scale-in"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-full h-full rounded-full border-2 border-white object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{post.user.name}</h3>
                  <p className="text-sm text-gray-500">{post.user.username}</p>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Post Image */}
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button className="hover:text-primary transition-colors">
                      <Heart className="h-6 w-6" />
                    </button>
                    <button className="hover:text-primary transition-colors">
                      <MessageCircle className="h-6 w-6" />
                    </button>
                    <button className="hover:text-primary transition-colors">
                      <Share2 className="h-6 w-6" />
                    </button>
                  </div>
                  <button className="hover:text-primary transition-colors">
                    <Bookmark className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">{post.likes.toLocaleString()} likes</p>
                  <p>
                    <span className="font-semibold">{post.user.username}</span>{" "}
                    {post.caption}
                  </p>
                  <button className="text-gray-500 text-sm">
                    View all {post.comments} comments
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;
