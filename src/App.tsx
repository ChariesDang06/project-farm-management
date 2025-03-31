import './App.css';
import { useState , useContext} from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { HiMiniChartPie } from "react-icons/hi2";
import {MdAssignment } from "react-icons/md";
import Sidebar, { SidebarItem } from "./components/side-bar/Sidebar";
import Header from "./components/header/Header";
import Breadcrumb_Comp from "./components/breadcrumb/Breadcrumb_Comp";
import HomePage from "./pages/home/HomePage";
import Dashboard from './pages/dashboard/DashboardPage';
import JobManage from './pages/job/JobManage';
import JobReport from './pages/job/JobReport';
import { AuthContext } from './hooks/user';
import Categories from './pages/prev-pages/categories/Categories';
import OldHerds from './pages/prev-pages/herds/Herds';
import Records from './pages/prev-pages/herds/Records';
import Diseases from './pages/prev-pages/diseases/Diseases';
import Treatments from './pages/prev-pages/treatments/Treatments';
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationContainer from "./components/NotificationContainer";
import { MdLinkedCamera } from "react-icons/md";
import IndexHerd from './pages/herds';
import IndexResources from './pages/resources';
import IndexEpidemic from './pages/epidemic';
import ButtonScrollToTop from './components/button/ButtonScrollToTop';
const queryClient = new QueryClient();
const SIDEBAR_ITEMS = [
  { text: "Tổng quan", url: "/dashboard", icon: <HiMiniChartPie /> },
  {
    text: "Giám sát",
    url: "/monitor",
    icon: <MdLinkedCamera />,
    subItems: [
      { text: "Vật nuôi", url: "/herds" },
      { text: "Dịch bệnh", url: "/epidemic" },
      { text: "Tài nguyên", url: "/resources" },
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
  //Code prev
  {
    text: "QL Admin (Prev)",
    url: "/admin",
    icon: <MdAssignment />,
    subItems: [
      { text: "Nhóm vật nuôi", url: "/admin/categories" },
      { text: "Đàn (pages old)", url: "/admin/old-herds" },
      { text: "Bệnh", url: "/admin/diseases" },
      { text: "Điều trị", url: "/admin/treatments" },
    ],
  },

];

function App() {
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ name: string; url: string }[]>([]);
  const [activeItem, setActiveItem] = useState<string>("/dashboard");
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
    const [expanded, setExpanded] = useState<boolean>(true);
    return (
      <>
      {currentUser && (
        <div className="flex">
          <div
            className={`md:relative absolute transition-all duration-300 
              ${expanded ? "w-[clamp(100px,16vw,240px)]" : "w-0"}
            `}
          >
            <Sidebar expanded={expanded} setExpanded={setExpanded}>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarItem
                  key={item.url}
                  icon={item.icon}
                  text={item.text}
                  active={activeItem === item.url || item.subItems?.some(sub => sub.url === activeItem)}
                  url={item.url}
                  onSelect={handleSidebarSelect}
                  subItems={item.subItems}
                />
              ))}
            </Sidebar>
          </div>

          <main
            className={`md:py-4 md:px-6 p-4 transition-all duration-300 flex-1 
              ${expanded ? "" : "ml-0"}
            `}
          >
            <Header expanded={expanded}/>
            <Breadcrumb_Comp items={breadcrumbItems} onNavigate={(url) => console.log("Navigate to:", url)} />
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
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
          path: "/herds",
          element: <IndexHerd />,
        },
        {
          path: "/epidemic",
          element: <IndexEpidemic />,
        },
        {
          path: "/resources",
          element: <IndexResources/>,
        },
       
        {
          path: "/job/manage",
          element: <JobManage />,
        },
        {
          path: "/job/report",
          element: <JobReport />,
        },
        {
          path: "/admin/categories",
          element: <Categories />,
        },
        {
          path: "/admin/diseases",
          element: <Diseases />,
        },
        {
          path: "/admin/treatments",
          element: <Treatments />,
        },
        {
          path: "/admin/old-herds",
          element: <OldHerds />,
        },
        {
          path: "/herds/:id",
          element: <Records />,
        },
        {
          path: "/detection",
          element: <Records />,
        },
        
      ],
    },
  ]);
  return (
      <NotificationProvider>
        <NotificationContainer />
        <RouterProvider router={router} />
        <ButtonScrollToTop />
      </NotificationProvider>
    
  );
}

export default App;