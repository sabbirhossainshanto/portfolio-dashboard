import { type Navigation } from "@toolpad/core/AppProvider";
import Project from "@mui/icons-material/Work";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";

export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Projects",
  },
  {
    segment: "projects",
    title: "Projects",
    icon: <Project />,
  },
  {
    segment: "add-project",
    title: "Add Project",
    icon: <ShoppingCartIcon />,
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
    icon: <LayersIcon />,
  },
  {
    segment: "add-skill",
    title: "Add Skill",
    icon: <LayersIcon />,
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
