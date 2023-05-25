import React from "react";
import { Carousel } from "antd";
import quote1 from "../components/images/quote1.jpg";
import quote2 from "../components/images/quote2.jpg";
import quote3 from "../components/images/quote3.jpg";
import quote4 from "../components/images/quote4.jpg";
import s from "./style/Carousel.module.css";
import Link from "next/link";

const contentStyle: React.CSSProperties = {
  margin: "0 auto",
  minWidth: "352px",
  maxWidth: "1200px",
  height: "auto",
};

const CarouselImage: React.FC = () => (
  <div className={s.carousel}>
    <Link href="/books">
      <h2 className={s.title}>See all books</h2>
    </Link>
    <div className={s.carousel_container}>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <img
              src={quote1.src}
              alt="logo"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            ></img>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src={quote2.src}
              alt="logo"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            ></img>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src={quote3.src}
              alt="logo"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            ></img>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src={quote4.src}
              alt="logo"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            ></img>
          </h3>
        </div>
      </Carousel>
    </div>
    <div className={s.description}>
      <div className={s.description_container}>
        <p>
          Welcome to our online bookstore, where you can find a huge selection
          of books in all genres and categories.
        </p>
        <p>
          Whether you're searching for gripping mysteries, heartwarming
          romances, informative non-fiction, or captivating children's books,
          we've got something for everyone.
        </p>
        <p>
          Our online bookstore also offers great prices, so you don't have to
          worry about breaking the bank to get your hands on the latest
          bestseller.
        </p>
        <p>
          So, what are you waiting for? Start browsing our online bookstore
          today and discover the perfect book for you!
        </p>
      </div>
    </div>
  </div>
);

export default CarouselImage;
