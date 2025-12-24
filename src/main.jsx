import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SalesAgent from './pages/SalesAgentView.jsx';
import SalesAgentManagementScreen from './pages/SalesAgentManagementScreen.jsx';
import ReportScreen from './pages/ReportScreen.jsx';
import LeadStatusView from './pages/LeadStatusView.jsx';
//import LeadManagementScreen from './pages/LeadManagementScreen.jsx'//
import LeadListScreen from './pages/LeadListScreen.jsx'
import AddNewLeadScreen from './pages/AddNewLeadScreen.jsx';
import { LeadProvider } from './contexts/LeadContext.jsx';
import { SalesAgentProvider } from './contexts/SalesAgentContext.jsx';
import SalesAgentView from './pages/SalesAgentView.jsx'
import AddNewSalesAgent from './pages/AddNewSalesAgent.jsx';
import LeadManagementWrapper from './pages/LeadManagementWrapper.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./charts/ChartSetup.jsx";
import Settings from './pages/Settings.jsx';


const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path: "/addnewleadscreen",
    element: <AddNewLeadScreen />
  },
  {
    path: "/leadlistscreen",
    element: <LeadListScreen/>
  },
  //{
   // path: "leadmanagementscreen/:leadId",
    //element: <LeadManagementScreen/>
  //},
  {
    path: "/leadstatusview/:status",
    element: <LeadStatusView />
  },
  {
    path: "/reportscreen",
    element: <ReportScreen />
  },
  {
    path: "/salesagentmanagementscreen",
    element: <SalesAgentManagementScreen/>
  },
  {
    path: "/salesagent",
    element: <SalesAgent />
  },
  {
    path: "/salesagentview/:agentId",
    element: <SalesAgentView/>
  },
  {
    path: "/addnewsalesagent",
    element: <AddNewSalesAgent/>
  },
  {
    path: "/leadmanagementscreen/:leadId",
    element: <LeadManagementWrapper/>
  },
  {
    path: "/settings",
    element: <Settings/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeadProvider>
    <SalesAgentProvider>
       <ToastContainer position="top-right" autoClose={3000} />
    <RouterProvider router={router}  />
    </SalesAgentProvider>
    </LeadProvider>
  </StrictMode>
)
