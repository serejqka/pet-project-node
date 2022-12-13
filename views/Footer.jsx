const React = require('react');

function Footer() {
  return (
    <footer id="footer" className="pt-3 m-4 text-center">
      {`© Pet Project ${new Date().getFullYear()}`}
    </footer>
  );
}

module.exports = Footer;
