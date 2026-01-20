export const parsePosts = posts => {
  const newPosts = posts.map(post => {
    return {
      id: post.id ? post.id : 0,
      fromUserId: post.from ? post.from : 0,
      toUserId: post.to ? post.to : 0,
      givenPoints: post.given_points ? post.given_points : 0,
      body: post.body ? post.body : 'default',
      reason: post.reason ? post.reason : 'default',
      createdAt: post.created_at ? post.created_at : '00:00',
      totalLikes: post.total_likes ? post.total_likes : 0,
      liked: post.liked ? post.liked : false,
      totalComments: post.total_comments ? post.total_comments : 0,
    };
  });
  return newPosts;
};
