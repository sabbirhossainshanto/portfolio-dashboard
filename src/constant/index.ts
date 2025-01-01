import { AiFillPauseCircle, AiFillProduct } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";

export const adminNavlist = [
  {
    key: "Dashboard",
    icon: MdDashboard,
    children: [
      {
        path: "/dashboard",
        text: "Home",
      },
    ],
  },
  {
    key: "Skill",
    icon: MdDashboard,
    children: [
      {
        path: "/dashboard/skills",
        text: "Skills",
      },
    ],
  },
  {
    key: "Project",
    icon: AiFillPauseCircle,
    children: [
      {
        path: "/dashboard/projects",
        text: "View Project",
      },
      {
        path: "/dashboard/add-project",
        text: "Add Project",
      },
    ],
  },
  {
    key: "Experience",
    icon: AiFillProduct,
    children: [
      {
        path: "/dashboard/experience",
        text: "Experience",
      },
    ],
  },
  {
    key: "Blog",
    icon: AiFillProduct,
    children: [
      {
        path: "/dashboard/blogs",
        text: "View Blogs",
      },
      {
        path: "/dashboard/add-blog",
        text: "Add Blog",
      },
    ],
  },
];
