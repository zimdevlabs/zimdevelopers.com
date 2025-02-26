import Image from "next/image";

import backgroundImage from "@/images/background-faqs.jpg";
import { Container } from "../container";

const faqs = [
  [
    {
      question: "What is the purpose of zimdevelopers.com?",
      answer:
        "Zimdevelopers.com is a comprehensive platform for programmers, designers, and tech enthusiates to access educational resources, collaborate, and track progress.",
    },
    {
      question: "How can I benefit from using zimdevelopers.com?",
      answer:
        "By using our app, you can improve your coding habits, access a vast library of resources, collaborate with peers, and monitor your learning progress effectively.",
    },
    {
      question:
        "Is zimdevelopers.com suitable for all ages and education levels?",
      answer:
        "Our platform caters to users of all education levels, offering tailored features and resources to meet diverse learning needs.",
    },
  ],
  [
    {
      question: "Can I access zimdevelopers.com on multiple devices?",
      answer:
        "Absolutely! Our app is accessible on various devices, including smartphones, tablets, and computers, through a web browser ",
    },
    {
      question: "How secure is my data on zimdevelopers.com?",
      answer:
        "We prioritize the security and privacy of our users’ data. Our platform employs robust encryption protocols.",
    },
    {
      question:
        "What support options are available if I encounter technical issues?",
      answer:
        " If you experience any technical difficulties while using our app, our dedicated support team is available to assist you promptly.",
    },
  ],
  [
    {
      question: "Can I customize my developer experience on the platform?",
      answer:
        "Absolutely! Our platform offers various customization options, allowing you to personalize your profile, organize your projects, and tailor your learning journey",
    },
    {
      question: "Are there paid premium features on zimdevelopers.com?",
      answer:
        "As of now there are no paid features on zimdevelopers.com. All features are free to use.",
    },
    {
      question: "I lost my password, how do I get into my account?",
      answer: "Click forgot password on the signin page.",
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and someone will get back to you within 24 hours.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
