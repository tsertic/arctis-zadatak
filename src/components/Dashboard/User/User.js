import React from 'react';
import styles from './User.module.scss';
import UserInformation from './UserInformation/UserInformation';
import LM from './../../../assets/LM.jpg';
const User = () => {
  return (
    <div className={styles.User}>
      <div className={styles.imageContainer}>
        <img src={LM} alt="" />
      </div>
      <UserInformation />
    </div>
  );
};

export default User;
