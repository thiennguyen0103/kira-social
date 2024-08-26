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
  routes: {
    home: "/",
    signIn: "/sign-in",
    signUp: "/sign-up",
    profile: "/profile",
    settings: "/settings",
  },
};
