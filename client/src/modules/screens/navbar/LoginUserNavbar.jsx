import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import lang from "../../../assets/data/lang.data";
import URI from "../../../assets/data/admin/uri.api";
import FRONT_URI from "../../../assets/data/admin/uri.front";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import handleClickPopUpReferrer from "../../components/popup/PopUpReferrer";
import {
  deleteSchedule,
  showSchedule,
} from "../../../assets/data/functions/schedules.func";

const loginNav = lang[0].navbar;
const log_forms = lang[0].log_forms;
const code_ref = lang[0].codeReferrer;
const ap = lang[0].appointment;

const handleLogout = () => {
  const buttonText = lang[0].form;
  const cookieJWT = Cookies.get("jwt");
  Swal.fire({
    title: log_forms.signing_out,
    html: buttonText.wait,
    icon: "info",
    showConfirmButton: false,
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });
  const fetchData = async () => {
    try {
      if (cookieJWT) {
        const response = await fetch(`${URI}/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jwt: cookieJWT }),
        });
        if (response.ok) {
          Cookies.remove("jwt");
          Cookies.remove("user");
          sessionStorage.removeItem("SESSION");
        }
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
};

const navText = lang[0].navbar;

const handleLang = (lang) => {
  localStorage.removeItem("lang");
  if (lang === "Spanish" || lang === "Español" || lang === "Espanhol") {
    localStorage.setItem("lang", "Español");
  } else if (lang === "Inglés" || lang === "English" || lang === "Inglês") {
    localStorage.setItem("lang", "English");
  } else if (
    lang === "Portugués" ||
    lang === "Portuguese" ||
    lang === "Português"
  ) {
    localStorage.setItem("lang", "Portugués");
  } else {
    localStorage.setItem("lang", "Español");
  }
  location.reload();
};

function NavList() {
  return (
    <List className="mt-4 mb-0 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href={`${FRONT_URI}/#about`}
        variant="small sm:large"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          {loginNav.about}
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href={`${FRONT_URI}/#services`}
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
        href={`${FRONT_URI}/#vipro`}
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
        href={`${FRONT_URI}/#contactus`}
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
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <Menu>
            <MenuHandler>
              <div className="font-medium">{navText.lang.name}</div>
            </MenuHandler>
            <MenuList className="bg-TVBlue border-white">
              {Object.values(lang[0].navbar.lang.lang_name).map(
                (langItem, index, array) => (
                  <MenuItem
                    key={index}
                    className={`text-white font-normal hover:bg-TVBlue text-center hover:text-black hover:font-semibold py-2 ${
                      index === array.length - 1
                        ? "border-b-0"
                        : "border-b-[1px]"
                    } rounded-none py-3`}
                    onClick={() => handleLang(langItem.name)}
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src={langItem.img}
                        alt={`${langItem.name}`}
                        className="w-[20px] h-[20px]"
                      />
                      <span className="px-4">{langItem.name}</span>
                    </div>
                  </MenuItem>
                )
              )}
            </MenuList>
          </Menu>
        </ListItem>
      </Typography>
    </List>
  );
}

export default function LoginUserNavbar() {
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(null);
  const [checkAlert, setCheckAlert] = useState(false);
  const [showDataSchedule, setShowDataSchedule] = useState(false);
  const [scheduleInfo, setScheduleInfo] = useState([]);
  const [userPicture, setUserPicture] = useState(
    "https://ionicframework.com/docs/img/demos/avatar.svg"
  ); // Valor por defecto
  const fetchUserPicture = () => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const userCookieToJson = JSON.parse(userCookie);
        if (userCookieToJson.avatar) {
          setUserPicture(userCookieToJson.avatar);
        }
      } catch (e) {
        console.error("Error al parsear la cookie del usuario:", e);
      }
    }
  };
  // Fetch user picture on component mount
  useEffect(() => {
    fetchUserPicture();
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const userCookie = Cookies.get("user");
        if (userCookie) {
          const userEmail = JSON.parse(userCookie).email;
          const schedule = await showSchedule(userEmail);
          setShowDataSchedule(schedule.showData);
          setScheduleInfo(schedule.data);
          console.log(schedule);
        } else {
          console.error("No se encontró la cookie del usuario.");
        }
      } catch (error) {
        console.error("Error al obtener el correo electrónico:", error);
      }
    };

    fetchSchedule();
  }, []);

  const getCountry = (country) => {
    switch (country.toLowerCase()) {
      case "estadosunidos":
        return "Estados Unidos";
      case "canada":
        return "Canadá";
      case "mexico":
        return "México";
      case "inglaterra":
        return "Inglaterra";
      case "china":
        return "China";
      case "australia":
        return "Australia";
      case "india":
        return "India";
      default:
        return "";
    }
  };

  const [openNav, setOpenNav] = React.useState(false);
  const [openAvatarMenu, setOpenAvatarMenu] = React.useState(false);
  const [isMenuOpenRF, setIsMenuOpenRF] = useState(false);

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
    const user = Cookies.get("user");
    if (user) {
      const userData = JSON.parse(user);
      return (
        <div className="flex flex-col px-3 pt-6 lg:pt-0">
          <h1 className="capitalize">{userData.name}</h1>
          <h1 className="font-semibold lg:text-center text-lg">
            {userData.country}
          </h1>
        </div>
      );
    } else {
      return <div>No user available</div>;
    }
  };

  const [pRef, setPRef] = useState(0);
  const [cRef, setCRef] = useState("");

  useEffect(() => {
    const fetchFormData = async () => {
      const userEmail = Cookies.get("user");
      const userDataEmail = JSON.parse(userEmail);
      const email = userDataEmail.email;
      setError(null);
      try {
        const response = await fetch(`${URI}/complete_forms`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        });
        if (!response.ok) {
          throw new Error("Error al cargar los formularios");
        }
        const data = await response.json();
        setFormData(data.forms);
        setPRef(data.personReferrer);
        setCRef(data.codeReferrer);
      } catch (err) {
        setError("Error al cargar los formularios");
      }
    };
    fetchFormData();
  }, []);

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCheckAlert(true);
      setTimeout(() => setCheckAlert(false), 5000);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  };
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
                  alt=""
                  className="border-2 border-white relative inline-block h-12 w-12 !rounded-full  object-cover object-center cursor-pointer"
                  onClick={handleAvatarClick}
                />
              </MenuHandler>
              <MenuList className="bg-TVBlue border-white">
                {/* Referidos */}
                <Menu>
                  <MenuHandler>
                    <MenuItem className="text-white font-nomal hover:bg-TVBlue text-center hover:text-black hover:font-semibold hover:cursor-pointer">
                      {log_forms.code_referrer}
                    </MenuItem>
                  </MenuHandler>
                  <MenuList className="bg-TVBlue px-2 py-4">
                    <Menu>
                      <div className="w-full m-auto">
                        <h3 className="text-center font-semibold text-white text-md pb-1 uppercase">
                          {code_ref.my_code}
                        </h3>
                        <div
                          className="flex flex-col w-1/2 items-center justify-center m-auto my-1 gap-2 hover:cursor-pointer"
                          onClick={() => copyCode(cRef)}
                        >
                          <h3
                            className={`${
                              checkAlert ? "text-green-600" : "text-white"
                            } font-medium`}
                          >
                            {checkAlert
                              ? code_ref.copied_text
                              : code_ref.copy_text}{" "}
                            <FontAwesomeIcon
                              icon={faCopy}
                              className={`${
                                checkAlert ? "text-green-600" : "text-white"
                              } px-1`}
                            />
                          </h3>
                          <span className="text-white font-semibold shadowbtn mx-2 rounded-sm border-[2] py-1 px-4 bg-TVred">
                            {cRef}
                          </span>
                        </div>
                        <h4
                          className={`text-center font-semibold ${
                            pRef >= 20 ? "text-green-600" : "text-white"
                          } py-2 capitalize`}
                        >
                          {code_ref.referral_count} {pRef}
                        </h4>
                        <p
                          className="text-center font-medium text-white hover:underline hover:cursor-pointer hover:text-TVred"
                          onClick={handleClickPopUpReferrer}
                        >
                          {code_ref.how_it_works}
                        </p>
                      </div>
                    </Menu>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuHandler>
                    <MenuItem className="text-white font-normal hover:bg-TVBlue text-center hover:text-black hover:font-semibold hover:cursor-pointer">
                      {ap.reservedAppointments}
                    </MenuItem>
                  </MenuHandler>
                  <MenuList className="bg-TVBlue px-2 py-4">
                    <div className="w-full flex flex-col gap-4 px-4 py-2">
                      {showDataSchedule ? (
                        <>
                          {scheduleInfo.map((info) => (
                            <div className="w-full m-auto text-white p-5 rounded-lg shadowbtn flex flex-col gap-1">
                              <p>
                                <strong>
                                  {ap.userName}
                                  {info.name}
                                </strong>{" "}
                              </p>
                              <p>
                                <strong>
                                  {ap.userEmail}
                                  {info.email}
                                </strong>{" "}
                              </p>
                              <p>
                                <strong>
                                  {ap.userPhone}
                                  {info.tel}
                                </strong>{" "}
                              </p>
                              <p>
                                <strong>
                                  {ap.userDate}
                                  {info.date}
                                </strong>{" "}
                              </p>
                              <p>
                                <strong>
                                  {ap.userSchedule}
                                  {info.schedule}
                                </strong>{" "}
                              </p>
                              <div className="flex flex-row gap-2">
                                <p className="w-full flex items-center">
                                  <strong>{ap.statusPending}</strong>{" "}
                                </p>
                                <button
                                  className="bg-TVred px-8 py-1 rounded hover:bg-red-700 w-auto cursor-pointer"
                                  onClick={() => deleteSchedule(info._id)}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="w-auto"
                                  />
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p className="text-white cursor-pointer text-center">
                          <strong>{ap.noDataToShow}</strong>{" "}
                        </p>
                      )}
                    </div>
                  </MenuList>
                </Menu>
                {/* Formularios */}
                <Menu>
                  <MenuHandler>
                    <MenuItem className="text-white font-nomal hover:bg-TVBlue text-center hover:text-black hover:font-semibold py-2 hover:cursor-pointer">
                      {log_forms.forms}
                    </MenuItem>
                  </MenuHandler>
                  <MenuList className="bg-TVBlue border-white">
                    {formData.length > 0 ? (
                      formData.map((item, index) => (
                        <MenuItem
                          key={index}
                          className="text-white font-normal hover:bg-TVBlue hover:text-black hover:font-semibold text-center"
                          onClick={() => {
                            window.location.href = `/forms/${item._id}`;
                          }}
                        >
                          {getCountry(item.form_country)}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem className="text-white font-normal text-center">
                        {log_forms.without_forms}
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
                <MenuItem
                  className="text-white font-nomal hover:bg-TVBlue text-center hover:text-black hover:font-semibold"
                  onClick={handleLogout}
                >
                  {log_forms.sign_out}
                </MenuItem>
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

        {/* Referidos */}
        <Menu>
          <MenuHandler>
            <MenuItem className="text-white font-nomal hover:bg-TVBlue hover:text-black hover:font-semibold hover:cursor-pointer">
              {log_forms.code_referrer}
            </MenuItem>
          </MenuHandler>
          <MenuList className="bg-TVBlue px-2 py-4">
            <Menu>
              <div className="w-full m-auto">
                <h3 className="text-center font-semibold text-white text-md pb-1 uppercase">
                  {code_ref.my_code}
                </h3>
                <div
                  className="flex flex-col w-1/2 items-center justify-center m-auto my-1 gap-2 hover:cursor-pointer"
                  onClick={() => copyCode("THDUCI")}
                >
                  <h3
                    className={`${
                      checkAlert ? "text-green-600" : "text-white"
                    } font-medium`}
                  >
                    {checkAlert ? code_ref.copied_text : code_ref.copy_text}{" "}
                    <FontAwesomeIcon
                      icon={faCopy}
                      className={`${
                        checkAlert ? "text-green-600" : "text-white"
                      } px-1`}
                    />
                  </h3>
                  <span className="text-white font-semibold shadowbtn mx-2 rounded-sm border-[2] py-1 px-4 bg-TVred">
                  {code_ref.my_code}
                  </span>
                </div>
                <h4 className="text-center font-semibold text-white py-2 capitalize">
                  {code_ref.referral_count} 0
                </h4>
                <p className="text-center font-medium text-white hover:underline hover:cursor-pointer hover:text-TVred">
                  {code_ref.how_it_works}
                </p>
              </div>
            </Menu>
          </MenuList>
        </Menu>
        <Menu>
          <MenuHandler>
            <MenuItem className="text-white font-normal hover:bg-TVBlue text-start hover:text-black hover:font-semibold hover:cursor-pointer">
              {ap.reservedAppointments}
            </MenuItem>
          </MenuHandler>
          <MenuList className="bg-TVBlue px-2 py-4">
            <div className="w-full flex flex-col gap-4 px-4 py-2">
              {showDataSchedule ? (
                <>
                  {scheduleInfo.map((info) => (
                    <div className="w-full m-auto text-white p-5 rounded-lg shadowbtn flex flex-col gap-1">
                      <p>
                        <strong>
                          {ap.userName}
                          {info.name}
                        </strong>{" "}
                      </p>
                      <p>
                        <strong>
                          {ap.userEmail}
                          {info.email}
                        </strong>{" "}
                      </p>
                      <p>
                        <strong>
                          {ap.userPhone}
                          {info.tel}
                        </strong>{" "}
                      </p>
                      <p>
                        <strong>
                          {ap.userDate}
                          {info.date}
                        </strong>{" "}
                      </p>
                      <p>
                        <strong>
                          {ap.userSchedule}
                          {info.schedule}
                        </strong>{" "}
                      </p>
                      <div className="flex flex-row gap-2">
                        <p className="w-full flex items-center">
                          <strong>{ap.statusPending}</strong>{" "}
                        </p>
                        <button
                          className="bg-TVred px-8 py-1 rounded hover:bg-red-700 w-auto cursor-pointer"
                          onClick={() => deleteSchedule(info._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-auto" />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-white cursor-pointer text-center">
                  <strong>{ap.noDataToShow}</strong>{" "}
                </p>
              )}
            </div>
          </MenuList>
        </Menu>
        {/* Formularios */}
        <Menu className="lg:hidden">
          <MenuHandler>
            <MenuItem className="flex items-center gap-2 py-2 pr-4">
              {log_forms.forms}
            </MenuItem>
          </MenuHandler>
          <MenuList className="bg-TVBlue border-white">
            {formData.length > 0 ? (
              formData.map((item, index) => (
                <MenuItem
                  key={index}
                  className="text-white font-normal hover:bg-TVBlue hover:text-black hover:font-semibold text-center"
                  onClick={() => {
                    window.location.href = `/forms/${item._id}`;
                  }}
                >
                  {getCountry(item.form_country)}
                </MenuItem>
              ))
            ) : (
              <MenuItem className="text-white font-normal text-center">
                {log_forms.without_forms}
              </MenuItem>
            )}
          </MenuList>
        </Menu>
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <div className="hidden gap-4 lg:flex">
            <img
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
              alt="avatar"
              class="border-2 border-white relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
            />
          </div>
        </div>
        <Typography
          as="a"
          variant="small sm:large"
          color="white"
          className="block xl:hidden font-medium mb-4"
        >
          <ListItem
            className="flex items-center gap-2 py-2 pr-4"
            onClick={handleLogout}
          >
            {log_forms.sign_out}
          </ListItem>
        </Typography>
      </Collapse>
    </Navbar>
  );
}
