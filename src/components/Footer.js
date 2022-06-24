const Footer = ({ text }) => {
  const style = {
    footer: {
      marginTop: "3rem",
      textAlign: "center",
    },
  };

  return (
    <footer style={style.footer}>
      <span className="red">N.B:</span>&nbsp; {text}
    </footer>
  );
};

export default Footer;
