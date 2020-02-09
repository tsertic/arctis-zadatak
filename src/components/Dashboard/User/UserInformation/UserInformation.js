import React from 'react';
import styles from './UserInformation.module.scss';
const UserInformation = () => {
  return (
    <div className={styles.UserInformation}>
      <div className={styles.header}>
        <h1>
          <span className={styles.header__title}>Luka Modrić</span>
        </h1>
        <h3>
          Footballer <span>&#9679;</span> model <span>&#9679;</span> Book Author
        </h3>
      </div>
      <ul className={styles.list}>
        <li className={styles.listField}>
          <strong className={styles.infoQ}>AGE</strong>
          <span className={styles.infoA}>34</span>
        </li>
        <li className={styles.listField}>
          <strong className={styles.infoQ}>ADDRESS</strong>
          <span className={styles.infoA}>Pantovčak 125D,Zagreb</span>
        </li>
        <li className={styles.listField}>
          <strong className={styles.infoQ}>E-MAIL</strong>
          <span className={styles.infoA}>lukica10@gmail.com</span>
        </li>
        <li className={styles.listField}>
          <strong className={styles.infoQ}>PHONE</strong>
          <span className={styles.infoA}>+385/91-1020-10</span>
        </li>
      </ul>
    </div>
  );
};

export default UserInformation;
