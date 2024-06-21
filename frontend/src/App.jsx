
import { Link, Outlet } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


export default function App() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className='grid-cols-2 gap-4'>
        <NavigationMenuItem>
          <Link to="/memo" className='text-gray-400'>Memo</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/viz" className='text-gray-400'>Viz</Link>
        </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Outlet/>
    </>
  )
}