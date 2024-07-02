import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import lang from "../../../../assets/data/lang.data";

export default function ContactForm() {
  const contactForm = lang[0].contact.form
  return (
    <Card color="white" shadow={true} className="max-w-xl sm:max-w-3xl lg:max-w-xl h-full mx-auto sm:px-10 sm:py-8 px-8 py-6 lg:px-8 lg:py-6 xl:px-16 xl:py-8 flex justify-center shadow">
      <Typography variant="h4" color="blue-gray">
      {contactForm.title}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        {contactForm.subtitle}
      </Typography>
      <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
            {contactForm.name} 
          </Typography> 
          <Input
            size="lg"
            placeholder=""
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            {contactForm.email}
          </Typography>
          <Input
            size="lg"
            placeholder="nombre@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            {contactForm.body}
          </Typography>
          <div class="w-full lg:w-96">
            <div class="relative w-full lg:min-w-[200px]">
              <textarea
                class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "></textarea>

            </div>
          </div>

        </div>
        <Button className="mt-6 bg-TVred shadowbtn" fullWidth>
          {contactForm.button}
        </Button>
      </form>
    </Card>
  );
}