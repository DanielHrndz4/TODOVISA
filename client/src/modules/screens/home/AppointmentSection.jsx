import React, { useEffect, useState } from "react";
import {
  horarios,
  saveDataAppointment,
} from "../../../assets/data/functions/schedules.func";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import {
  dataInizialization,
  filteredArrayFunc,
  popUpTextInfo,
  validateData,
  validateDate,
} from "../../../assets/data/functions/appointment.func";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { Fade } from "react-awesome-reveal";
import fetchData from "../../../assets/data/validation/token.validation";
import Cookies from "js-cookie";
import Alert from "../../components/alert/ShowAlert";
import handleClickSendAppointment from "../../components/popup/PopUpSendAppointment";
import ReactDOMServer from "react-dom/server";
import lang from "../../../assets/data/lang.data";

const AppointmentSection = () => {
  const [dateState, setDateState] = useState(new Date());
  const [text, setText] = useState(["Obteniendo resultados"]);
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [infoUser, setInfoUser] = useState(dataInizialization);

  const ap = lang[0].appointment;

  const updateInfoUser = (updates) => {
    setInfoUser((prevState) => ({
      ...prevState,
      ...updates,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateInfoUser({ [name]: value });
  };

  const changeDate = (date) => {
    setDateState(date);
    updateInfoUser({ schedule: "" });
    setSelectedSchedule("");
    updateInfoUser({ date: moment(date).format("DD/MM/YYYY") });
  };

  const callTimer = (date, dateNotValid) => {
    const cTimer = setTimeout(() => {
      horarios(date, dateNotValid)
        .then((schedule) => {
          setText(schedule);
        })
        .catch((error) => {
          console.error("Error fetching schedule:", error);
        });
    }, 1000);

    return cTimer;
  };

  const callEventSchedule = (e) => {
    e.preventDefault();
    setSelectedSchedule(e.target.textContent);
    updateInfoUser({ schedule: e.target.textContent });
  };

  const html = (info) => {
    return (
      <div className="max-w-1/2 w-full px-4">
        <h1 class="text-black text-xl text-center font-semibold pb-4">
          {info.title}
        </h1>
        <div className="text-justify flex flex-col gap-2">
          {info.paragraph.map((item) => {
            return <p>{item}</p>;
          })}
        </div>
      </div>
    );
  };

  const bookAppointment = async (infoUser) => {
    const validate = await fetchData(Cookies.get("jwt"));
    setMessage(validateData(infoUser));
    if (filteredArrayFunc(Object.entries(infoUser)).length == 0) {
      const htmlString = validate
        ? ReactDOMServer.renderToString(html(ap.withSession))
        : ReactDOMServer.renderToString(html(ap.withoutSession));
      const icon = validate ? "info" : "warning";
      const btn = validate ? ap.sendButton: ap.loginButton;
      if (!validate) {
        localStorage.setItem("userInformation", JSON.stringify(infoUser));
      }
      handleClickSendAppointment(htmlString, icon, validate, btn, infoUser);
    }
  };

  useEffect(() => {
    const lInfo = JSON.parse(localStorage.getItem("userInformation"));
    if (lInfo != null) {
      updateInfoUser(lInfo);
    }
  }, []);

  useEffect(() => {
    message === "" ? setErrorAlert(false) : setErrorAlert(true);
  }, [message]);

  const optionSchedule = () => {
    return (
      <>
        {text.map((schedule, index) => (
          <tr key={index}>
            <td
              className={`px-4 py-2 hover:cursor-pointer 
              ${
                selectedSchedule !== "" && selectedSchedule === schedule
                  ? "bg-TVBlue text-white font-semibold"
                  : index % 2 === 0
                  ? "bg-gray-300"
                  : "bg-white"
              }`}
              onClick={callEventSchedule}
            >
              {schedule}
            </td>
          </tr>
        ))}
      </>
    );
  };

  const schedule = (day) => {
    return (
      <>
        <table className="bg-white w-full mx-auto shadow rounded-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">{ap.availableSchedulesHeader}</th>
            </tr>
          </thead>
          <tbody>
            {validateDate(moment(dateState).format("DD/MM/YYYY")) ? (
              day === "Sunday" ? (
                <tr>
                  <td className="py-2 px-4 bg-gray-300">
                    <p>{ap.noAvailableSchedules}</p>
                  </td>
                </tr>
              ) : (
                optionSchedule()
              )
            ) : (
              <tr>
                <td className="py-2 px-4 bg-gray-300">
                  <p>{ap.dateNotAvailable}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  };

  useEffect(() => {
    setText(["Obteniendo resultados"]);
    const timer = callTimer(
      moment(dateState).format("DD/MM/YYYY"),
      moment(dateState).format("dddd")
    );
    return () => clearTimeout(timer);
  }, [dateState]);

  return (
    <div
      className="relative text-center w-full m-auto pt-4 pb-6 lg:pt-8 lg:pb-8 bg-TVBlue shadowbtn min-h-[500px] overflow-hidden"
      style={{
        backgroundImage: 'url("./img/background/appoinment2.webp")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Fade>
        <div className="w-full lg:w-full xl:w-[95%] m-auto flex flex-col py-6 glassmorphism rounded-md">
          <h1 className="w-full pt-4 sm:pb-12 xl:pb-10 pb-8 text-5xl lg:text-4xl xl:text-5xl font-bold text-center text-white [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.6)]">
            {ap.pageTitle}
          </h1>
          <div className="flex flex-col lg:flex-row h-full lg:px-8">
            <div className="w-full xl:w-[90%] md:w-full flex flex-col justify-center items-center lg:px-0 sm:px-10">
              <form
                action=""
                className="w-full xl:w-[85%] px-8 py-10 rounded-md bg-white shadowbtn"
              >
                <h1 className="text-2xl font-semibold text-gray-900 pb-4 text-start">
                  {ap.formTitle}
                </h1>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-start py-2"
                >
                  {ap.fullNameLabel}
                </Typography>
                <Input
                  size="lg"
                  placeholder=""
                  name="name"
                  value={infoUser.name}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-start py-2"
                >
                  {ap.emailLabel}
                </Typography>
                <Input
                  size="lg"
                  placeholder=""
                  name="email"
                  value={infoUser.email}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-start py-2"
                >
                  {ap.phoneLabel}
                </Typography>
                <Input
                  size="lg"
                  placeholder=""
                  name="tel"
                  value={infoUser.tel}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-start py-2"
                >
                  {ap.messageLabel}
                </Typography>
                <Textarea
                  size="lg"
                  placeholder=""
                  name="messagge"
                  maxLength={100}
                  value={infoUser.messagge}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
              </form>
            </div>
            <div className="w-full h-full flex flex-col justify-around items-center">
              <div className="flex flex-col xl:flex-row w-[90%]">
                <div className="flex w-full m-auto">
                  <Calendar
                    value={dateState}
                    onChange={changeDate}
                    className="shadowbtn flex m-auto lg:mb-6 flex-col w-full my-6 lg:my-0"
                  />
                </div>
                <div className="w-full flex flex-col">
                  {schedule(
                    moment(dateState).format("DD/MM/YYYY").split(" ")[0]
                  )}
                </div>
              </div>
              <div className="w-[90%] bg-white mt-6 shadowbtn px-8 py-4 rounded-sm text-start flex flex-col">
                <h1 className="text-center pb-4 border-b-[1px] border-black font-semibold text-lg">
                  {ap.userInfoTitle}
                </h1>
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-1 py-4">
                  <p className="py-1">
                    <strong>{ap.userName}</strong>
                    {infoUser.name}
                  </p>
                  <p className="py-1">
                    <strong>{ap.userDate}</strong>
                    {infoUser.date}
                  </p>
                  <p className="py-1">
                    <strong>{ap.userEmail}</strong>
                    {infoUser.email}
                  </p>
                  <p className="py-1">
                    <strong>{ap.userSchedule}</strong>
                    {infoUser.schedule}
                  </p>
                  <p className="py-1">
                    <strong>{ap.userPhone}</strong>
                    {infoUser.tel}
                  </p>
                  <p className="py-1 overflow-auto whitespace-normal break-words">
                    <strong>{ap.userMessage}</strong>
                    {infoUser.messagge}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {errorAlert && (
            <div className="mt-10 w-1/4 m-auto">
              <Alert severity="error">{message}</Alert>
            </div>
          )}
          <div className="pt-6">
            <Button
              className="py-4 px-10 rounded-sm shadowbtn bg-TVred"
              onClick={() => bookAppointment(infoUser)}
            >
              {ap.bookingButton}
            </Button>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default AppointmentSection;
