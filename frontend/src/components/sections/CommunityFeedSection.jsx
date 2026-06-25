import React from 'react';

function CommunityFeedSection() {
  const posts = [
    {
      author: 'Harshit Sharma',
      image: 'https://via.placeholder.com/300?text=Post1',
      caption: 'Day 90 of my transformation journey! 💪 #TitanNutrition',
      likes: 2543,
    },
    {
      author: 'Priya Singh',
      image: 'https://via.placeholder.com/300?text=Post2',
      caption: 'New PR with consistent training and Titan Pre-Workout! 🔥',
      likes: 1876,
    },
    {
      author: 'Vikram Singh',
      image: 'https://via.placeholder.com/300?text=Post3',
      caption: 'Bulking phase looking good! Thanks Titan 🙌',
      likes: 3245,
    },
  ];

  return (
    <section id="community" className="py-20 bg-gradient-hero">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-display mb-4 text-gray-900">Community Feed</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow our community for inspiration and fitness content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <div key={idx} className="card p-0 overflow-hidden">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="font-semibold mb-2 text-gray-900">{post.author}</p>
                <p className="text-gray-700 text-sm mb-3">{post.caption}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>❤️</span>
                  <span>{post.likes.toLocaleString()} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary">Follow Us on Instagram</button>
        </div>
      </div>
    </section>
  );
}

export default CommunityFeedSection;
