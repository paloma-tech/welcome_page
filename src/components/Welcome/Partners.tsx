import React from "react";
import Image from "next/image";

const Partners = () => {
  // You'll need to add actual partner logos to your public directory
  const partners = [
    {
      name: "Partner 1",
      logo: "/images/welcome/partners/partner1.png"
    },
    {
      name: "Partner 2",
      logo: "/images/welcome/partners/partner2.png"
    },
    {
      name: "Partner 3",
      logo: "/images/welcome/partners/partner3.png"
    },
    {
      name: "Partner 4",
      logo: "/images/welcome/partners/partner4.png"
    },
    {
      name: "Partner 5",
      logo: "/images/welcome/partners/partner5.png"
    },
    {
      name: "Partner 6",
      logo: "/images/welcome/partners/partner6.png"
    }
  ];

  return (
    <section className="py-10 md:py-16 bg-white dark:bg-gray-dark">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 duration-300"
                >
                  <div className="h-16 w-auto">
                    {/* Placeholder for partner logo */}
                    <div className="h-full w-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {partner.name}
                      </span>
                    </div>
                    {/* Uncomment when you have actual logos 
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="h-full w-auto object-contain"
                    /> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;