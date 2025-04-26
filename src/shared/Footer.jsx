import { useRef } from 'react';
function Footer() {
  const currentYear = useRef(() => {
    const now = new Date(Date.now());
    return now.getFullYear();
  });
  return (
    <footer>
      <p>
        Made with ❤️ | &copy; {currentYear.current}{' '}
        <a href="https://codethedream.org/">CTD </a>
      </p>
    </footer>
  );
}
export default Footer;
