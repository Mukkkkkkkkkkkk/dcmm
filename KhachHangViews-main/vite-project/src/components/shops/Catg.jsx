import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

const Catg = () => {
  const data = [
    {
      cateName: "Xuất xứ",
      options: ["option 1", "option 2", "option 3"],
    },
    {
      cateName: "Thương hiệu",
      options: ["option 4", "option 5", "option 6"],
    },
    {
      cateName: "Giá",
      options: ["Dưới 100k", "100k đến 500k", "Trên 500k"],
    },
    {
      cateName: "Màu sắc",
      options: ["option 10", "option 11", "option 12"],
    },
    {
      cateName: "Kích thước",
      options: ["option 13", "option 14", "option 15"],
    }
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <>
      <div className="category">
        <div className="chead d_flex">
          <h1> Bộ lọc </h1>
        </div>
        <Accordion className="">
          {data.map((value, index) => {
            return (
              <Accordion.Item
                eventKey={index}
                className="box"
                key={index}
              >
                <Accordion.Header>{value.cateName}</Accordion.Header>
                <Accordion.Body>
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {value.options.map((option, optionIndex) => (
                      <li key={optionIndex} style={{ listStyleType: "none" }}>
                        <label>
                          <input
                            type="checkbox"
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleOptionChange(option)}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
        <div className="box box2">
          <button onClick={() => console.log(selectedOptions)}>
            View All Brands
          </button>
        </div>
      </div>
    </>
  );
};

export default Catg;
