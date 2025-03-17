"use client";
import { FormEvent, useEffect, useState } from "react";

interface FormData {
  name: string;
  company: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: "success" | "error" | null;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: null,
    message: "",
  });

  // Animation handler
  useEffect(() => {
    const animateElements = () => {
      document.querySelectorAll(".elementor-invisible").forEach((element) => {
        if (isElementInViewport(element)) {
          element.classList.remove("elementor-invisible");
          element.classList.add("elementor-visible");
          const animation = element.getAttribute("data-animation");
          if (animation) {
            element.classList.add(animation);
          }
        }
      });
    };

    const isElementInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    };

    window.addEventListener("scroll", animateElements);
    animateElements(); // Initial check

    return () => window.removeEventListener("scroll", animateElements);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append("access_key", "73e22efd-65f6-4aa1-a1a4-6baa684c7c70");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setFormStatus({
            type: "success",
            message: res.message,
          });
          setFormData({
            name: "",
            company: "",
            email: "",
            message: "",
          });
        } else {
          setFormStatus({
            type: "error",
            message: res.message,
          });
        }
      });
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary/5 py-16 dark:bg-primary/10 md:py-20 lg:py-28">
        <div className="container relative">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="w-full lg:w-1/2">
              <div data-animation="fadeInUp" className="elementor-invisible">
                <h1 className="mb-5 text-3xl font-bold text-black dark:text-white sm:text-4xl lg:text-3xl xl:text-4xl">
                  Contact us
                </h1>
              </div>
              <div
                data-animation="fadeInUp"
                className="elementor-invisible"
                style={{ animationDelay: "200ms" }}
              >
                <h4 className="text-lg font-medium text-body-color dark:text-body-color-dark">
                  Get in touch and let us know how we can help.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="flex flex-wrap">
            {/* Form Column */}
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
              <div
                data-animation="fadeIn"
                className="elementor-invisible mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              >
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  Send us a message
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  Our team is here to help you optimize your business operations
                  and enhance your point of sale experience.
                </p>

                {formStatus.type && (
                  <div
                    className={`mb-8 rounded-sm px-8 py-4 ${
                      formStatus.type === "success"
                        ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your name"
                          className="w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="company"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Enter your company name"
                          className="w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                          className="w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="message"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Enter your Message"
                          className="w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark ${
                          isSubmitting ? "cursor-not-allowed opacity-75" : ""
                        }`}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info Column */}
            <div
              data-animation="fadeInRight"
              className="elementor-invisible w-full px-4 lg:w-5/12 xl:w-4/12"
            >
              <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
                  Get in touch
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  {
                    "Have a question about our ERP Point of Sale system? We're here to provide you with the best support possible."
                  }
                </p>

                <div className="mb-8 flex w-full max-w-[370px] items-center">
                  <div className="mr-6 flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary">
                    <i className="mdi mdi-email-check text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-black dark:text-white">
                      Email Us
                    </h4>
                    <a
                      href="mailto:contact@paloma.tn"
                      className="text-base text-body-color hover:text-primary dark:text-body-color-dark"
                    >
                      contact@paloma.tn
                    </a>
                  </div>
                </div>

                <div className="mb-8 flex w-full max-w-[370px] items-center">
                  <div className="mr-6 flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary">
                    <i className="mdi mdi-phone text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="mb-1 text-xl font-bold text-black dark:text-white">
                      Call Us
                    </h4>
                    <div className="text-base text-body-color dark:text-body-color-dark">
                      <a
                        href="tel:+21692530875"
                        className="block hover:text-primary"
                      >
                        +216 92 530 875
                      </a>
                      <a
                        href="tel:+21690656399"
                        className="block hover:text-primary"
                      >
                        +216 90 656 399
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
