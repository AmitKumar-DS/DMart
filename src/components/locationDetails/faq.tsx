import * as React from "react";
import { useEffect, useState } from "react";

type Faq = {
  prop: any;
  faq_title: any;
  faq_description: any;
};

const Faq = (faqData: Faq) => {
  const [faq_Data, setFaq_Data] = useState([]);
  const [faqClass, setFaqClass] = useState("");
  const [selected, setselected] = useState(null);
  const isShowContent = (e: any, index: any) => {
    setselected(index);
    let parent = e.target.parentNode;
    let parent2 = e.target.parentNode.parentNode;
    if (
      parent.classList.contains("opened") ||
      parent2.classList.contains("opened")
    ) {
      setFaqClass("");
    } else {
      var acc = document.getElementsByClassName("faq-block");
      for (let s = 0; s < -1; s++) {
        acc[s].classList.remove("opened");
      }
      setFaqClass("opened");
    }
  };
  useEffect(() => {
    setFaq_Data(faqData.prop);
  });

  return (
    <>
      <div className="faq-sec light-bg">
        <div className="container">
          <div className="faq-blocks">
            <div className="w-full mb-8 md:text-center">
              <h2 className="sec-title text-center">{faqData.faq_title}</h2>
              <p className="text-base md:text-xl">{faqData.faq_description}</p>
            </div>

            {faq_Data?.map((i: any, index: any) => {
              return (
                <div
                  id={index}
                  className={
                    selected == index ? `faq-block ${faqClass}` : "faq-block"
                  }
                  key={index}
                >
                  <h4
                    className="faq-title"
                    onClick={(e) => isShowContent(e, index)}
                  >
                    {i.question.replace(/[^A-Za-z.]/g, " ")}
                    <span className="faq-icon"></span>
                  </h4>
                  <>
                    <div className="faq-content">
                      <p className="text-sm md:text-base text-white">
                        {i.answer.replace(/[^A-Za-z.]/g, " ")}
                      </p>
                    </div>
                  </>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Faq;
