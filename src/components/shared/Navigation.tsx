import { type Navigation } from "@toolpad/core/AppProvider";
import { CgWebsite } from "react-icons/cg";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import { SiHyperskill } from "react-icons/si";

export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Projects",
  },
  {
    segment: "projects",
    title: "Projects",
    icon: <CgWebsite size={20} />,
  },
  {
    segment: "add-project",
    title: "Add Project",
    icon: <CgWebsite size={20} />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Skills",
  },
  {
    segment: "skills",
    title: "Skills",
    icon: <SiHyperskill />,
  },

  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
];
