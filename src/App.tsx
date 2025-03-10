import './App.css';
import { useState , useContext} from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import { HiMiniChartPie } from "react-icons/hi2";
import { MdOutlinePets, MdSick, MdAssignment } from "react-icons/md";
import { BiSolidBarChartSquare } from "react-icons/bi";

import Sidebar, { SidebarItem } from "./components/side-bar/Sidebar";
import Header from "./components/header/Header";
import Breadcrumb_Comp from "./components/breadcrumb/Breadcrumb_Comp";
import HomePage from "./pages/home/HomePage";
import Dashboard from './pages/dashboard/DashboardPage';
import Herds from './pages/herds/Herds';
import AbnormalDetection from './pages/herds/AbnormalDetection';
import HerdsReport from './pages/herds/HerdsReport';
import EpidemicReport from './pages/epidemic/EpidemicReport';
import TreatmentPlan from './pages/epidemic/TreatmentPlan';
import TrackRecord from './pages/epidemic/TrackRecord';
import ResourcesReport from './pages/resources/ResourcesReport';
import Water from './pages/resources/Water';
import Food from './pages/resources/Food';
import Medical from './pages/resources/Medical';
import JobManage from './pages/job/JobManage';
import JobReport from './pages/job/JobReport';
import { AuthContext } from './hooks/user';

const queryClient = new QueryClient();
const SIDEBAR_ITEMS = [
  { text: "Tổng quan", url: "/dashboard", icon: <HiMiniChartPie /> },
  {
    text: "QL Vật nuôi",
    url: "/herds",
    icon: <MdOutlinePets />,
    subItems: [
      { text: "Đàn", url: "/herds/manage" },
      { text: "Phát hiện bất thường", url: "/herds/abnormal-detection" },
      { text: "Báo cáo", url: "/herds/report" },
    ],
  },
  {
    text: "KS Dịch bệnh",
    url: "/epidemic",
    icon: <MdSick />,
    subItems: [
      { text: "Hồ sơ theo dõi", url: "/epidemic/track-record" },
      { text: "Kế hoạch điều trị", url: "/epidemic/treatment-plan" },
      { text: "Báo cáo", url: "/epidemic/report" },
    ],
  },
  {
    text: "QL Tài nguyên",
    url: "/resources",
    icon: <BiSolidBarChartSquare />,
    subItems: [
      { text: "Nước", url: "/resources/water" },
      { text: "Thức ăn", url: "/resources/food" },
      { text: "Y tế", url: "/resources/medical" },
      { text: "Báo cáo", url: "/resources/report" },
    ],
  },
  {
    text: "QL Công việc",
    url: "/job",
    icon: <MdAssignment />,
    subItems: [
      { text: "Công việc", url: "/job/manage" },
      { text: "Báo cáo", url: "/job/report" },
    ],
  },
];

function App() {
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ name: string; url: string }[]>([]);
  const handleSidebarSelect = (selectedPath: string) => {
    const foundItem = SIDEBAR_ITEMS.find(
      (item) => item.url === selectedPath || item.subItems?.some((sub) => sub.url === selectedPath)
    );
    if (foundItem) {
      const selectedSub = foundItem.subItems?.find((sub) => sub.url === selectedPath);
      setBreadcrumbItems([
        { name: foundItem.text, url: foundItem.url },
        ...(selectedSub ? [{ name: selectedSub.text, url: selectedSub.url }] : []),
      ]);
    }
  };
  const Layout = () => {
    const { currentUser } = useContext(AuthContext);
    return (
      <>
      {currentUser && (
          <div className="flex">
          <div className="flex-1 max-w-[345px] box-border">
            <Sidebar>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarItem
                  key={item.url}
                  icon={item.icon}
                  text={item.text}
                  url={item.url}
                  onSelect={handleSidebarSelect}
                  subItems={item.subItems}
                />
              ))}
            </Sidebar>
          </div>
    
          <main className="flex-5 py-4 px-6">
            <Header />
            <Breadcrumb_Comp items={breadcrumbItems} onNavigate={(url) => console.log("Navigate to:", url)} />
            <>
              <QueryClientProvider client={queryClient}>
                    <Outlet />
              </QueryClientProvider>
            </>
          </main>
        </div>
      )}
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/herds/manage",
          element: <Herds />,
        },
        {
          path: "/herds/abnormal-detection",
          element: <AbnormalDetection />,
        },
        {
          path: "/herds/report",
          element: <HerdsReport />,
        },
        {
          path: "/epidemic/track-record",
          element: <TrackRecord />,
        },
        {
          path: "/epidemic/treatment-plan",
          element: <TreatmentPlan />,
        },
        {
          path: "/epidemic/report",
          element: <EpidemicReport />,
        },
        {
          path: "/resources/water",
          element: <Water />,
        },
        {
          path: "/resources/food",
          element: <Food />,
        },
        {
          path: "/resources/medical",
          element: <Medical />,
        },
        {
          path: "/resources/report",
          element: <ResourcesReport />,
        },
        {
          path: "/job/manage",
          element: <JobManage />,
        },
        {
          path: "/job/report",
          element: <JobReport />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;