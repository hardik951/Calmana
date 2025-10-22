import React, { useState, useEffect } from 'react';
// Added Palette icon for the new theme selector
import { Heart, MessageSquare, Send, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'; 
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Input } from './ui/input';

// --- Define Themes ---
const themes = {
  calmana: {
    bg: 'bg-emerald-50',
    header: 'text-emerald-800',
    headerSub: 'text-emerald-700',
    name: 'Calmana'
  },
  rose: {
    bg: 'bg-rose-50',
    header: 'text-rose-800',
    headerSub: 'text-rose-700',
    name: 'Rose'
  },
  sky: {
    bg: 'bg-sky-50',
    header: 'text-sky-800',
    headerSub: 'text-sky-700',
    name: 'Sky'
  },
  neutral: {
    bg: 'bg-slate-100',
    header: 'text-slate-800',
    headerSub: 'text-slate-700',
    name: 'Neutral'
  },
};

// --- Mock Data (Unchanged) ---
const mockCurrentUser = {
  username: 'Dr. Smith',
  avatarUrl: '/api/placeholder/40/40?seed=drsmith',
};
const mockPostsData = [
  { 
    id: 1, 
    username: 'Alice', 
    avatarUrl: '/api/placeholder/40/40?seed=alice',
    date: '2025-10-22', 
    message: 'Feeling great today! That meditation session helped a lot. Feeling centered and calm. 🌿', 
    likes: 12, 
    isLiked: false,
    comments: [
      { id: 101, username: 'Bob', avatarUrl: '/api/placeholder/40/40?seed=bob', text: 'That\'s great to hear, Alice!' }
    ] 
  },
  // ... other posts
  { 
    id: 2, 
    username: 'Bob', 
    avatarUrl: '/api/placeholder/40/40?seed=bob',
    date: '2025-10-21', 
    message: 'Does anyone have tips for handling anxiety before big meetings? My heart always races.', 
    likes: 5, 
    isLiked: true,
    comments: [
      { id: 102, username: 'Claire', avatarUrl: '/api/placeholder/40/40?seed=claire', text: 'Deep breathing exercises! 4 seconds in, 4 hold, 6 out.' },
      { id: 103, username: 'Alice', avatarUrl: '/api/placeholder/40/40?seed=alice', text: 'I try to reframe it as "excitement" instead of "anxiety". Sometimes helps!' }
    ] 
  },
];


// --- Main Component ---
export default function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [newPostMessage, setNewPostMessage] = useState('');
  const [posting, setPosting] = useState(false);
  // --- Add Theme State ---
  const [theme, setTheme] = useState('calmana'); // Default theme

  useEffect(() => {
    setPosts(mockPostsData);
  }, []);

  // --- Handlers (Unchanged) ---
  const handlePost = () => {
    if (!newPostMessage.trim()) return;
    setPosting(true);
    setTimeout(() => {
      const newPost = {
        id: posts.length + 100, 
        username: mockCurrentUser.username,
        avatarUrl: mockCurrentUser.avatarUrl,
        date: new Date().toISOString().slice(0, 10),
        message: newPostMessage.trim(),
        likes: 0,
        isLiked: false,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setNewPostMessage('');
      setPosting(false);
    }, 1000);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked 
        };
      }
      return post;
    }));
  };

  const handleComment = (postId, commentText) => {
    const newComment = {
      id: Math.random(), 
      username: mockCurrentUser.username,
      avatarUrl: mockCurrentUser.avatarUrl,
      text: commentText,
    };
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  return (
    // ===== DYNAMIC BACKGROUND =====
    <div className={`min-h-screen w-full p-8 ${themes[theme].bg} transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto space-y-8"> 
        
        {/* --- Header (Dynamic Text Color) --- */}
        <header className="mb-4 text-center">
          <h1 className={`text-4xl font-extrabold mb-2 ${themes[theme].header}`}>
            Community
          </h1>
          <p className={`text-xl ${themes[theme].headerSub}`}>
            Connect with others, share, learn and grow together.
          </p>
        </header>

        {/* --- NEW Theme Selector --- */}
        <Card className="shadow-lg bg-white/80">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg text-gray-700">
              <Palette className="w-5 h-5 mr-2" />
              Choose Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {Object.keys(themes).map((themeKey) => (
              <div key={themeKey} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setTheme(themeKey)}
                  className={`w-10 h-10 rounded-full border-2 ${themes[themeKey].bg} 
                  ${theme === themeKey 
                    ? 'ring-2 ring-blue-500 ring-offset-2 border-blue-500' 
                    : 'border-gray-300'
                  } transition-all`}
                  aria-label={`Select ${themes[themeKey].name} theme`}
                />
                <span className="text-xs font-medium text-gray-600">
                  {themes[themeKey].name}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
          
        {/* --- Create Post Card (Unchanged) --- */}
        <Card className="shadow-lg bg-white">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
            <Avatar>
              <AvatarImage src={mockCurrentUser.avatarUrl} alt={mockCurrentUser.username} />
              <AvatarFallback>
                {mockCurrentUser.username.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg text-gray-900">Share your thoughts</h3>
          </CardHeader>
          <CardContent className="pb-4">
            <Textarea
              rows={4}
              className="w-full p-2 border-gray-200 rounded-md resize-none bg-white"
              placeholder="What's on your mind? Share something with the community..."
              value={newPostMessage}
              onChange={(e) => setNewPostMessage(e.target.value)}
              disabled={posting}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handlePost}
              disabled={posting || !newPostMessage.trim()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {posting ? 'Posting...' : 'Post'}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>

        {/* --- Feed (Unchanged) --- */}
        <div className="space-y-6">
          {posts.length === 0 && !posting && (
            <p className="text-center text-gray-700 text-lg">No posts yet. Be the first to share!</p>
          )}
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onLike={handleLike}
              onComment={handleComment} 
              currentUser={mockCurrentUser}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// --- Post Card Sub-Component (Theme-Neutral Colors) ---
function PostCard({ post, onLike, onComment, currentUser }) {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    onComment(post.id, newComment.trim());
    setNewComment('');
  };
  
  return (
    <Card className="shadow-md bg-white transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={post.avatarUrl} alt={post.username} />
            <AvatarFallback>
              {post.username.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-semibold text-gray-900">{post.username}</span>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-800 text-base whitespace-pre-wrap">{post.message}</p>
      </CardContent>

      <CardFooter className="flex flex-col items-start pt-4">
        {/* --- Actions --- */}
        <div className="flex gap-4 w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-gray-600 hover:bg-gray-100 ${post.isLiked ? 'text-red-500' : ''}`}
            onClick={() => onLike(post.id)}
          >
            <Heart className={`w-5 h-5 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
            {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:bg-gray-100"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
          </Button>
        </div>
        
        {/* ===== UPDATED SEPARATOR COLOR ===== */}
        <Separator className="my-4 bg-gray-200" /> 
        
        {/* --- Comments --- */}
        <div className="w-full space-y-3">
          {post.comments.map(comment => (
            <div key={comment.id} className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={comment.avatarUrl} alt={comment.username} />
                <AvatarFallback className="text-xs">
                  {comment.username.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {/* ===== UPDATED COMMENT BG COLOR ===== */}
              <div className="bg-gray-50 rounded-lg px-4 py-2 w-full"> 
                <span className="font-semibold text-gray-800 text-sm">{comment.username}</span>
                <p className="text-gray-700 text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Add Comment Input --- */}
        <div className="flex w-full items-center gap-3 mt-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.username} />
            <AvatarFallback className="text-xs">
              {currentUser.username.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <Input 
            className="flex-1 bg-white border-gray-300"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-green-600 hover:bg-green-100" 
            disabled={!newComment.trim()}
            onClick={handleCommentSubmit} 
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

      </CardFooter>
    </Card>
  );
}