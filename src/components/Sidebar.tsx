import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// Define the type for each navigation item.
interface NavItem {
  route: string;
  label: string;
  emoji: string;
}

// List of routes matching your component file names.
const navItems = [

   { route: "/instruction-page", label: "Instruction Page", emoji: "📖", component: "InstructionPage" },
   { route: "/TokenPriceChart", label: "TokenPriceChart", emoji: "📖", component: "TokenPriceChart" },
   { route: "/whitepaper", label: "White Paper", emoji: "📄", component: "WhitePaper" },
   { route: "/PhysicalTokenTransfer", label: "PhysicalTokenTransfer", emoji: "📄", component: "PhysicalTokenTransfer" },

];
// Styled-components for Sidebar
const SidebarContainer = styled.aside`
  width: 250px;
  height: 100vh;
  background-color: silver;
  padding: 1rem;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 200px;
    transform: translateX(-100%);
    position: fixed;
    z-index: 1000;
  }
`;

const SidebarHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  img {
    max-width: 100%;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #333;
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const SidebarLink = styled(Link)<{ isActive: boolean }>`
  display: block;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "#fff" : "#333")};
  background-color: ${({ isActive }) => (isActive ? "#007bff" : "transparent")};
  font-size: 1rem;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};

  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const Sidebar: React.FC = () => {
  const location = useLocation();

return (
    <SidebarContainer>
      <SidebarHeader>
        <img src="/logo.jpeg" alt="Logo" />
        <h2>Navigation</h2>
      </SidebarHeader>
      <SidebarNav>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.route; // Determine if the link is active
          return (
            <SidebarLink
              key={index}
              to={item.route}
              isActive={isActive} // Pass the isActive prop
            >
              {item.emoji} {item.label}
            </SidebarLink>
          );
        })}
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;