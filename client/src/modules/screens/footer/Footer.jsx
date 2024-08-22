import { Typography } from "@material-tailwind/react";
import lang from "../../../assets/data/lang.data";
import FRONT_URI from "../../../assets/data/admin/uri.front";

export default function Footer() {
  let currentYear = new Date().getFullYear();
  const footer = lang[0].footer;
  return (
    <footer className="w-full bg-TVBlue lg:p-10 p-6 mt-4 pt-6">
      <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-around">
        <img src="/img/logo/todovisa.png" alt="" className="lg:w-[200px] w-[150px] lg:py-0 py-4" />
        <ul className="flex lg:flex-row flex-col flex-wrap items-center gap-y-4 lg:gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href={`${FRONT_URI}/#about`}
              color="white"
              className="font-bold transition-colors hover:text-TVred focus:text-blue-500"
            >
              {footer.about}
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href={`${FRONT_URI}/#services`}
              color="white"
              className="font-bold transition-colors hover:text-TVred focus:text-blue-500"
            >
              {footer.service}
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href={`${FRONT_URI}/#vipro`}
              color="white"
              className="font-bold transition-colors hover:text-TVred focus:text-blue-500"
            >
              {footer.VIPRO}
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href={`${FRONT_URI}/#contactus`}
              color="white"
              className="font-bold transition-colors hover:text-TVred focus:text-blue-500"
            >
              {footer.Contact}
            </Typography>
          </li>
          <li>
            <div className="flex gap-4 text-white sm:justify-center">
              <Typography
                as="a"
                href="https://www.facebook.com/todovisasv?mibextid=ZbWKwL"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Typography>
            </div>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-TVBlue" />
      <hr className="my-8 border-blue-gray-50 flex" />
      <Typography color="white" className="text-center font-bold">
        &copy; {currentYear} Volamos S.A de C.V
      </Typography>
    </footer>
  );
}
