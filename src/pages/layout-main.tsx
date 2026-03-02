import { Outlet, useLocation } from "react-router"
import MainHeader from "@/components/ui/main-header"
import MainContent from "@/components/ui/main-content"

export default function LayoutMain() {
  const { pathname } = useLocation()
  if (pathname.includes("refund-details")) {
    console.log("O path contém 'refund-details'")
  }

  return (
    <>
      <MainHeader className="mx-auto mt-9" />
      <div className="flex items-center justify-center">
        <MainContent size={pathname.includes("refund") ? "sm" : "md"}>
          <Outlet />
        </MainContent>
      </div>
    </>
  )
}
