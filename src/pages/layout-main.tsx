import { Outlet } from "react-router"
import Text from "../components/ui/text"
import MainHeader from "@/components/ui/main-header"

export default function LayoutMain() {
  return (
    <>
      <MainHeader className="mt-9" />
      <Outlet />
    </>
  )
}
