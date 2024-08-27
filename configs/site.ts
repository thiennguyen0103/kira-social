import { Icons } from "@/components/icons";

export const siteConfig = {
  logo: "Kira",
  nav: [
    {
      id: "home",
      name: "Home",
      path: "/",
      outlinedIcon: Icons.outlinedHouse,
      filledIcon: Icons.filledHouse,
    },
    {
      id: "friends",
      name: "Friends",
      path: "/friends",
      outlinedIcon: Icons.oulinedPeople,
      filledIcon: Icons.filledPeople,
    },
    {
      id: "stories",
      name: "Stories",
      path: "/stories",
      outlinedIcon: Icons.outlinedPlayCircle,
      filledIcon: Icons.filledPlayCircle,
    },
  ],
  // TODO: Set correct path
  leftMenu: [
    {
      id: "myPosts",
      name: "My Posts",
      icon: "/posts.png",
      path: "/",
    },
    {
      id: "activities",
      name: "Activities",
      icon: "/activity.png",
      path: "/",
    },
    {
      id: "marketplace",
      name: "Marketplace",
      icon: "/market.png",
      path: "/",
    },
    {
      id: "events",
      name: "Events",
      icon: "/events.png",
      path: "/",
    },
    {
      id: "albums",
      name: "Albums",
      icon: "/albums.png",
      path: "/",
    },
    {
      id: "videos",
      name: "Videos",
      icon: "/videos.png",
      path: "/",
    },
    {
      id: "news",
      name: "News",
      icon: "/news.png",
      path: "/",
    },
    {
      id: "courses",
      name: "Courses",
      icon: "/courses.png",
      path: "/",
    },
    {
      id: "lists",
      name: "Lists",
      icon: "/lists.png",
      path: "/",
    },
    {
      id: "settings",
      name: "Settings",
      icon: "/settings.png",
      path: "/",
    },
  ],
  routes: {
    home: "/",
    signIn: "/sign-in",
    signUp: "/sign-up",
    profile: "/profile",
    settings: "/settings",
  },
};
