import React from 'react';

const Footer = () => (
    <>
    <div id="seperator" />
    <div className="footer">
        &copy; {new Date().getFullYear()}<br/>
        created by: chris del duco<br/>
        <a href="https://www.linkedin.com/in/christopher-del-duco/"> contact </a>
    </div>
    </>
);

export default Footer;