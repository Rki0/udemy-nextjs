import Image from "next/image";

import styles from "./hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/coding-event.jpg"
          alt="An image showing Rki0"
          width={300}
          height={300}
        />
      </div>

      <h1>Hi, I'm Rki0</h1>

      <p>I blog about web development - especailly frontend frameworks.</p>
    </section>
  );
}

export default Hero;
