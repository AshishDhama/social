import { matchRoutes, useLocation } from "react-router-dom"
import { RoutesData } from "../App"

const useCurrentPath = () => {
    const location = useLocation()
    const [{ route }] = matchRoutes(RoutesData, location)
  
    return route.path
  }

  export default useCurrentPath;