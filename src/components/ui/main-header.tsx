import Container from "./container"
import Logo from "../../assets/images/logo-refund.svg?react"
import { Link, useLocation, useNavigate } from "react-router"
import cx from "classnames"
import Button from "./button"
import Text from "./text"
// import PhotosSearch from "./photos-search";

// import PhotoNewDialog from "../contexts/photos/components/photo-new-dialog";
// import AlbumNewDialog from "../contexts/albums/components/album-new-dialog";

interface MainHeaderProps extends React.ComponentProps<typeof Container> {}

export default function MainHeader({ className, ...props }: MainHeaderProps) {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate("/refund-request")
  }

  return (
    <Container
      as="header"
      className={cx("flex items-center justify-between gap-10", className)}
      {...props}
    >
      <Link to="/">
        <Logo className="h-7" />
      </Link>

      {/* {pathname === "/" && (
        <>
          <PhotosSearch />
          <Divider orientation="vertical" className="h-10" />
        </>
      )} */}

      <div className="flex items-center gap-8">
        <Link
          to="/"
          className={pathname === "/" ? "gap-4 text-green-100" : "gap-4"}
        >
          Solicitações de reembolso
        </Link>
        <Button variant="primary" size="sm" onClick={handleButtonClick}>
          Nova Solicitação
        </Button>
      </div>
    </Container>
  )
}
