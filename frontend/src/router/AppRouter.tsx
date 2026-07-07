import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { ChatPage } from "../pages/ChatPage";
import { EmergencyPage } from "../pages/EmergencyPage";
import { FAQPage } from "../pages/FAQPage";
import { DashboardPage } from "../pages/DashboardPage";
import { HomePage } from "../pages/HomePage";
import { InsurancePage } from "../pages/InsurancePage";
import { KnowledgeAdminPage } from "../pages/KnowledgeAdminPage";
import { LifeGuidePage } from "../pages/LifeGuidePage";
import { ScholarshipPage } from "../pages/ScholarshipPage";
import { SchoolPage } from "../pages/SchoolPage";
import { VisaPage } from "../pages/VisaPage";
import { WorkPage } from "../pages/WorkPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/visa" element={<VisaPage />} />
          <Route path="/life" element={<LifeGuidePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/scholarship" element={<ScholarshipPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/school" element={<SchoolPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/admin/knowledge" element={<KnowledgeAdminPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
