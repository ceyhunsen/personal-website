import "@/_components/css/footer.css";

export default function footer() {
  return (
    <footer>
      <p>Ceyhun Şen, {new Date().getFullYear()}</p>

      <div>
        <a href="mailto:ceyhuusen@gmail.com" target="_blank">
          <img src="/assets/logos/envelope.svg" alt="Envelope" />
        </a>
        <a href="https://www.linkedin.com/in/ceyhun-sen/" target="_blank">
          <img src="/assets/logos/linkedin.svg" alt="LinkedIn" />
        </a>
        <a href="https://github.com/ceyhunsen" target="_blank">
          <img src="/assets/logos/github.svg" alt="Github" />
        </a>
      </div>
    </footer>
  );
}
