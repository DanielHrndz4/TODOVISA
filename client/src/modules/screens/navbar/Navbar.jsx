import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import lang from "../../../assets/data/lang.data";
import FRONT_URI from "../../../assets/data/admin/uri.front";

const navText = lang[0].navbar

const handleLang = (lang) => {  
  localStorage.removeItem('lang');
  if (lang === 'Spanish' || lang === 'Español' || lang === 'Espanhol') {
    localStorage.setItem('lang', "Español");
  } else if (lang === 'Inglés' || lang === 'English' || lang === 'Inglês') {
    localStorage.setItem('lang', "English");
  } else if (lang === 'Portugués' || lang === 'Portuguese' || lang === 'Português') {
    localStorage.setItem('lang', "Portugués");
  } else {
    localStorage.setItem('lang', 'Español');
  }
  location.reload();
};

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href={`${FRONT_URI}/#about`}
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {navText.about}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href={`${FRONT_URI}/#services`}
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {navText.service}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href={`${FRONT_URI}/#vipro`}
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">{navText.VIPRO}</ListItem>
      </Typography>
      <Typography
        as="a"
        href={`${FRONT_URI}/#contactus`}
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {navText.Contact}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <Menu>
            <MenuHandler>
              <div>{navText.lang.name}</div>
            </MenuHandler>
            <MenuList className="bg-TVBlue border-white">
              {Object.values(lang[0].navbar.lang.lang_name).map((langItem, index, array) => (
                <MenuItem
                  key={index}
                  className={`text-white font-normal hover:bg-TVBlue text-center hover:text-black hover:font-semibold py-2 ${index === array.length - 1 ? 'border-b-0' : 'border-b-[1px]'} rounded-none py-3`}
                  onClick={() => handleLang(langItem.name)}
                >
                  <div className="flex flex-row items-center">
                    <img src={langItem.img} alt={`${langItem.name}`} className="w-[20px] h-[20px]" />
                    <span className="px-4">{langItem.name}</span>
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </ListItem>
      </Typography>
    </List>
  );
}

export default function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const colorRD = "#B6122A";

  return (
    <Navbar className="max-w-full px-2 py-2 lg:px-12 lg:py-3 border-transparent rounded-none fixed top-0 left-0 right-0 z-50 bg-TVBlue">
      <div className="max-w-[80%] xl:max-w-[80%] lg:max-w-full m-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            <img src="/img/logo/todovisa.png" alt="" className="w-[90px]" />
          </Typography>
        </Link>
        <div className="flex flex-row gap-8">
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-4 lg:flex">
            <Link to="/signin">
              <Button size="md" className="shadowbtn bg-transparent">
                {navText.signin}
              </Button>
            </Link>
            <Link to="signup">
              <Button
                variant="gradietrent"
                size="md"
                className="shadowbtn bg-TVred"
              >
                {navText.signup}
              </Button>
            </Link>
          </div>
        </div>
        <IconButton
          variant="text"
          color="white"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden pb-4">
          <Link to="/signin">
            <Button size="md" className="shadowbtn bg-transparent">
              {navText.signin}
            </Button>
          </Link>
          <Link to="signup">
            <Button
              variant="gradietrent"
              size="md"
              className="shadowbtn bg-TVred"
            >
              {navText.signup}
            </Button>
          </Link>
        </div>
      </Collapse>
    </Navbar>
  );
}
