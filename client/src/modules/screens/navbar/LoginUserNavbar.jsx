import React, { useEffect, useState } from "react";
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
import Cookies from 'js-cookie';
import lang from "../../../assets/data/lang.data";
import URI from "../../../assets/data/admin/uri.api";


const navListMenuItems = [
    {
        title: "Products",
        description: "Find the perfect solution for your needs.",
        icon: SquaresPlusIcon,
    },
    {
        title: "About Us",
        description: "Meet and learn about our dedication",
        icon: UserGroupIcon,
    },
    {
        title: "Blog",
        description: "Find the perfect solution for your needs.",
        icon: Bars4Icon,
    },
    {
        title: "Services",
        description: "Learn how we can help you achieve your goals.",
        icon: SunIcon,
    },
    {
        title: "Support",
        description: "Reach out to us for assistance or inquiries",
        icon: GlobeAmericasIcon,
    },
    {
        title: "Contact",
        description: "Find the perfect solution for your needs.",
        icon: PhoneIcon,
    },
    {
        title: "News",
        description: "Read insightful articles, tips, and expert opinions.",
        icon: NewspaperIcon,
    },
    {
        title: "Products",
        description: "Find the perfect solution for your needs.",
        icon: RectangleGroupIcon,
    },
    {
        title: "Special Offers",
        description: "Explore limited-time deals and bundles",
        icon: TagIcon,
    },
];

const handleLogout = () => {
    const cookieJWT = Cookies.get('jwt')
    const fetchData = async () => {
        try {
            if (cookieJWT) {
                const response = await fetch(
                    `${URI}/logout`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ jwt: cookieJWT })
                    }
                );
                if (response.ok) {
                    Cookies.remove('jwt');
                    Cookies.remove('user');
                    sessionStorage.removeItem('SESSION');
                }
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };
    fetchData();
};

const loginNav = lang[0].navbar

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const renderItems = navListMenuItems.map(
        ({ icon, title, description }, key) => (
            <a href="#" key={key}>
                <MenuItem className="flex items-center gap-3 rounded-lg">
                    <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                        {" "}
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 text-gray-900 w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="white"
                            className="flex items-center text-sm font-bold"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="paragraph"
                            className="text-xs !font-medium text-blue-gray-500"
                        >
                            {description}
                        </Typography>
                    </div>
                </MenuItem>
            </a>
        )
    );


}

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
    console.log(localStorage.getItem('lang'));
    location.reload();
};

function NavList() {
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            <Typography
                as="a"
                href="#about"
                variant="small sm:large"
                color="white"
                className="font-medium"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    {loginNav.about}
                </ListItem>
            </Typography>
            <NavListMenu />
            <Typography
                as="a"
                href="#services"
                variant="small sm:large"
                color="white"
                className="font-medium"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    {loginNav.service}
                </ListItem>
            </Typography>
            <Typography
                as="a"
                href="#vipro"
                variant="small sm:large"
                color="white"
                className="font-medium"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    {loginNav.VIPRO}
                </ListItem>
            </Typography>
            <Typography
                as="a"
                href="#contactus"
                variant="small sm:large"
                color="white"
                className="font-medium"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    {loginNav.Contact}
                </ListItem>
            </Typography>
            <Typography
                as="a"
                variant="small sm:large"
                color="white"
                className="block xl:hidden font-medium"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4" onClick={handleLogout}>
                    Cerrar sesion
                </ListItem>
            </Typography>
            <Typography
                as="a"
                variant="small sm:large"
                color="white"
                className="font-medium"
            >
                <ListItem className="flex items-center gap-2 py-2 pr-4">
                    <Menu>
                        <MenuHandler>
                            <div className="font-medium">{navText.lang.name}</div>
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

export default function LoginUserNavbar() {
    const [userPicture, setUserPicture] = useState('https://ionicframework.com/docs/img/demos/avatar.svg'); // Valor por defecto
    const fetchUserPicture = () => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            try {
                const userCookieToJson = JSON.parse(userCookie);
                if (userCookieToJson.avatar) {
                    setUserPicture(userCookieToJson.avatar);
                }
            } catch (e) {
                console.error('Error al parsear la cookie del usuario:', e);
            }
        }
    };

    // Fetch user picture on component mount
    useEffect(() => {
        fetchUserPicture();
    }, []);
    const [openNav, setOpenNav] = React.useState(false);
    const [openAvatarMenu, setOpenAvatarMenu] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const handleAvatarClick = () => {
        setOpenAvatarMenu(!openAvatarMenu);
    };

    const getUserName = () => {
        const user = Cookies.get('user');
        if (user) {
            const userData = JSON.parse(user);
            return (
                <div className="flex flex-col px-3 pt-6 lg:pt-0">
                    <h1 className="capitalize">{userData.name}</h1>
                    <h1 className="font-semibold lg:text-center text-lg">{userData.country}</h1>
                </div>
            );
        } else {
            return <div>No user data available</div>;
        }
    }

    return (
        <Navbar className="min-w-full px-2 py-2 lg:px-12 lg:py-3 border-transparent rounded-none fixed top-0 left-0 right-0 z-50 bg-TVBlue">
            <div className="w-[80%] xl:w-[80%] lg:w-full m-auto flex items-center justify-between text-white">
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
                <div className="flex flex-row lg:justify-center lg:items-center gap-8">
                    <div className="hidden h-full lg:flex lg:flex-row">
                        <NavList />
                    </div>
                    <div className="hidden gap-4 lg:flex lg:justify-center lg:items-center">
                        <Menu>
                            {getUserName()}
                            <MenuHandler>
                                <img
                                    src={userPicture}
                                    alt="avatar"
                                    className="border-2 border-white relative inline-block h-12 w-12 !rounded-full  object-cover object-center cursor-pointer"
                                    onClick={handleAvatarClick}
                                />
                            </MenuHandler>
                            <MenuList className="bg-TVBlue border-white">
                                <MenuItem className="text-white font-nomal hover:bg-TVBlue text-center hover:text-black hover:font-semibold" onClick={handleLogout}>Cerrar sesión</MenuItem>
                            </MenuList>
                        </Menu>
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
                {getUserName()}

                <NavList />
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    <div className="hidden gap-4 lg:flex">
                        <img
                            src="https://ionicframework.com/docs/img/demos/avatar.svg"
                            alt="avatar"
                            class="border-2 border-white relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                        />
                    </div>
                </div>
            </Collapse>
        </Navbar>
    );
}
