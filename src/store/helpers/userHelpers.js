// import { parseFuckingAds } from "./adsHelpers";

export const parseUser = (user) => {
  return {
    name: user.name ? user.name : 'default name',
    image: user.image ? user.image : 'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png',
    isOnline: user.is_online ? user.is_online : false,
    isVerified: user.is_verified ? user.is_verified : false,
    phone: user.phone ? user.phone : '',
    id: user.user_id ? user.user_id : '',
    isStore: user.is_store ? user.is_store : false
  }
}
export const parseUserData = (user) => {
  return {
    id: user.id ? user.id : 0,
    email: user.email ? user.email : 'default email',
    firstName: user.first_name ? user.first_name : '',
    isVerified: user.is_verified ? user.is_verified : false,
    lastName: user.last_name ? user.last_name : '',
    location: user.location ? user.location : 'default location',
    phone: user.phone ? user.phone : '',
    totalPoints: user.total_points ? user.total_points : 0,
    image: user.user_image ? user.user_image : 'https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png'
  }
};
export const paresUserDetails = (userData) => {
  return {
    user: parseUserData(userData.user_data),
    totalFavorites: userData.total_favorites ? userData.total_favorites : 0,
    totalAds: userData.total_ads ? userData.total_ads : 0,
    profileUrl: userData.user_data && userData.user_data.profile_url,
    points: {
      total: userData.points.phone_number + userData.points.facebook_points + userData.points.email_points + userData.points.google_points,
      facebook: userData.points.facebook_points ? userData.points.facebook_points : 0,
      phone: userData.points.phone_number ? userData.points.phone_number : 0,
      email: userData.points.email_points ? userData.points.email_points : 0,
      google: userData.points.google_points ? userData.points.google_points : 0
    }
  }
}


export const paresUserProfile = (profile) => {
  return {
    image: profile.user_image ? profile.user_image : '',
    location: profile.user_location ? profile.user_location : '',
    isVerified: profile.is_verified ? true : false,
    isOnline: profile.is_online ? true : false,
    name: profile.full_name ? profile.full_name : '',
    phone: profile.phone_number ? profile.phone_number : '',
    social_verification: profile.social_verification ? profile.social_verification : {},
    createdAt: profile.created_at ? profile.created_at : '',
    // ads: parseFuckingAds(profile.ads || []),
    profileUrl: profile.profile_url
  }
}