import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <div className="pt-16">
      <p className="text-base text-gray-500">Trusted by learners from</p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5">
        <img
          src={assets.microsoft_logo}
          alt="Microsoft"
          className="md:w-28 w-20" loading="lazy"
        />
        <img src={assets.walmart_logo} alt="Walmart" className="md:w-28 w-20" loading="lazy" />
        <img
          src={assets.accenture_logo}
          alt="Accenture"
          className="md:w-28 w-20" loading="lazy"
        />
        <img
          src={assets.adobe_logo}
          alt="Adobe_logo"
          className="md:w-28 w-20" loading="lazy"
        />
        <img src={assets.paypal_logo} alt="Paypal" className="md:w-28 w-20"  loading="lazy"/>
      </div>
    </div>
  );
};

export default Companies;
