const routes = [
    {
      path: "/app/dashboard", // the url
      icon: "HomeIcon", // the component being exported from icons/index.js
      name: "Bảng Xếp Hạng", // name that appear in Sidebar
    },
    {
      path: "/app/enter-scores",
      icon: "ListViewIcon",
      name: "Nhập Điểm",
    },
    {
      path: "/app/total-scores",
      icon: "GridViewIcon",
      name: "Bảng Điểm",
    },
    
    {
      path: "/app/settings",
      icon: "OutlineCogIcon",
      name: "Cài Đặt",
    },
    {
      path: "/logout",
      icon: "OutlineLogoutIcon",
      name: "Đăng Xuất",
    },
  ];
  
  export default routes;
  