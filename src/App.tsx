import { FormEvent, useState } from "react";
import {
  Brain,
  Check,
  ChevronDown,
  Mail,
  Menu,
  Send,
  X,
} from "lucide-react";

const faqs = [
  {
    question: "¿Cómo sé si necesito ir a terapia?",
    answer:
      "No hace falta “estar muy mal” para acudir a terapia. Si algo te preocupa de forma recurrente, sientes ansiedad, bloqueo o tristeza, o no estás pudiendo gestionarlo como te gustaría, puede ser un buen momento para pedir ayuda.",
  },
  {
    question: "¿Cómo es la primera sesión?",
    answer:
      "La primera sesión es un espacio para conocernos. Hablaremos sobre lo que te trae a consulta, tus objetivos y tu situación actual. No necesitas venir con nada preparado.",
  },
  {
    question: "¿Cuánto dura el proceso terapéutico?",
    answer:
      "No hay una duración fija. Depende de cada persona y de los objetivos que trabajemos. Lo iremos valorando juntos durante el proceso.",
  },
  {
    question: "¿Las sesiones son online o presenciales?",
    answer:
      "Trabajo principalmente en formato online, con la misma privacidad y confidencialidad que en una consulta presencial y con mayor flexibilidad.",
  },
  {
    question: "¿Es confidencial lo que comparta en terapia?",
    answer:
      "Sí. Todo lo que compartas se trata bajo secreto profesional y de acuerdo con la normativa de protección de datos y el código deontológico.",
  },
];

function Logo({ full = true }: { full?: boolean }) {
  return (
    <a className="logo" href="#inicio" aria-label="Ir al inicio">
      <span className="logo-mark"><Brain size={22} strokeWidth={1.8} /></span>
      {full && <span>Sergio Fuentes | Psicología</span>}
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [sent, setSent] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="site-shell">
      <header className="header">
        <div className="nav-wrap">
          <div className="desktop-logo"><Logo /></div>
          <div className="mobile-logo"><Logo full={false} /></div>

          <nav className={menuOpen ? "nav open" : "nav"} aria-label="Principal">
            <a href="#inicio" onClick={closeMenu}>Inicio</a>
            <a href="#servicios" onClick={closeMenu}>Servicios</a>
            <a href="#metodo" onClick={closeMenu}>Cómo trabajo</a>
            <a href="#sobre-mi" onClick={closeMenu}>Sobre mí</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
          </nav>

          <a className="contact-pill" href="#contacto">
            <span><Mail size={16} /></span>
            Contacto
          </a>

          <button
            className="menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />
          <div className="hero-inner">
            <div className="hero-copy reveal">
              <p className="eyebrow">PSICOLOGÍA ONLINE · ADULTOS</p>
              <h1>Terapia online basada en la evidencia para la ansiedad y depresión</h1>
              <p className="hero-text">
                Trabajo con Terapia Cognitivo-Conductual y análisis funcional para
                entender qué mantiene el malestar y ayudarte a generar cambios reales
                y sostenibles.
              </p>
              <div className="hero-actions">
                <a className="button button-light" href="#metodo">Conocer cómo trabajo</a>
                <a className="button button-primary" href="#contacto">
                  Reservar sesión online <Send size={15} />
                </a>
              </div>
            </div>
            <div className="portrait-card reveal-delay">
              <div className="portrait-frame">
                <img src="/assets/method.jpg" alt="Sergio Fuentes, psicólogo" />
              </div>
            </div>
          </div>
        </section>

        <section className="section help-section" id="servicios">
          <div className="section-grid intro-grid">
            <div>
              <p className="section-kicker">SERVICIOS</p>
              <h2>¿En qué puedo ayudarte?</h2>
              <p>
                Trabajo con personas adultas que están atravesando momentos de
                ansiedad, desánimo o bloqueo y quieren entender qué les está pasando
                para empezar a cambiarlo.
              </p>
              <p>
                Ofrezco <strong>terapia online individual</strong>, estructurada y
                basada en evidencia científica.
              </p>
            </div>
            <img className="wide-illustration" src="/assets/service.png" alt="" />
          </div>

          <div className="services-grid">
            <article className="service-card">
              <img src="/assets/services.png" alt="" />
              <div>
                <span>01</span>
                <h3>Ansiedad</h3>
                <p>
                  Si sientes preocupación constante, dificultad para desconectar,
                  ataques de pánico, rumiación o evitación de situaciones que antes no
                  te costaban, podemos trabajar para reducir el malestar y recuperar
                  sensación de control.
                </p>
              </div>
            </article>
            <article className="service-card reverse">
              <img src="/assets/about.png" alt="" />
              <div>
                <span>02</span>
                <h3>Depresión</h3>
                <p>
                  Si notas apatía, falta de energía, culpa frecuente, desmotivación o
                  dificultad para activarte, trabajaremos de forma progresiva para
                  recuperar estabilidad y bienestar.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="section method-section" id="metodo">
          <div className="method-grid">
            <img src="/assets/help.png" alt="Proceso terapéutico estructurado" />
            <div>
              <p className="section-kicker">MI ENFOQUE</p>
              <h2>¿Cómo trabajo?</h2>
              <p>
                Trabajo con un enfoque estructurado y basado en evidencia científica.
                Analizamos qué está manteniendo el malestar en tu día a día
                —pensamientos, emociones y conductas— para entender el problema antes
                de intervenir.
              </p>
              <p>
                A partir de ahí, aplicamos herramientas prácticas de Terapia
                Cognitivo-Conductual adaptadas a tu situación, con objetivos claros y
                seguimiento del progreso.
              </p>
              <p>
                El objetivo no es solo sentirte mejor ahora, sino desarrollar recursos
                que puedas mantener en el tiempo.
              </p>
              <a className="button button-primary" href="#contacto">Reservar sesión online</a>
            </div>
          </div>
        </section>

        <section className="section about-section" id="sobre-mi">
          <div className="about-grid">
            <div>
              <p className="section-kicker">CONÓCEME</p>
              <h2>Sobre mí</h2>
              <p>
                Soy Sergio Fuentes, Psicólogo General Sanitario, con formación en
                análisis funcional de la conducta. Me interesa comprender en
                profundidad qué está pasando en tu vida y qué puede estar manteniendo
                el malestar, para poder trabajarlo de forma clara y práctica.
              </p>
              <p>
                Estoy especialmente sensibilizado con la realidad del colectivo
                LGTBIQ+ y quiero que este sea un espacio seguro, respetuoso y libre de
                juicios. Un lugar donde puedas hablar con tranquilidad y trabajar
                desde quien realmente eres.
              </p>
            </div>
            <div className="about-photo">
              <img src="/assets/hero.jpg" alt="Retrato profesional de Sergio Fuentes" />
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contacto">
          <div className="contact-heading">
            <p className="section-kicker">PRIMER PASO</p>
            <h2>Reserva tu sesión online</h2>
            <p>
              Si sientes que es el momento de empezar, completa este formulario y me
              pondré en contacto contigo lo antes posible.
            </p>
          </div>

          <div className="form-glow">
            {sent ? (
              <div className="success-message">
                <span><Check /></span>
                <h3>Solicitud enviada</h3>
                <p>Gracias. Me pondré en contacto contigo lo antes posible.</p>
                <button className="button button-primary" onClick={() => setSent(false)}>
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row">
                  <label>Nombre*<input name="name" placeholder="María" required /></label>
                  <label>Apellidos*<input name="surname" placeholder="Gómez" required /></label>
                </div>
                <label>Email*<input name="email" type="email" placeholder="correo@hola.com" required /></label>
                <label>Teléfono de contacto*<input name="phone" type="tel" placeholder="+34" required /></label>
                <label>¿Cómo te ayudo?<textarea name="message" placeholder="Explica brevemente tu situación..." rows={4} /></label>
                <label className="privacy">
                  <input type="checkbox" required />
                  <span>Acepto la política de privacidad.</span>
                </label>
                <button className="button button-primary submit-button" type="submit">
                  Reservar <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="contact-heading">
            <p className="section-kicker">DUDAS HABITUALES</p>
            <h2>Preguntas más frecuentes</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const open = activeFaq === index;
              return (
                <article className={open ? "faq-item open" : "faq-item"} key={faq.question}>
                  <button onClick={() => setActiveFaq(open ? -1 : index)}>
                    <span>{faq.question}</span>
                    <ChevronDown size={18} />
                  </button>
                  <div className="faq-answer"><p>{faq.answer}</p></div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <div>
            <Logo />
            <p>Terapia online basada en la evidencia para ansiedad y depresión en adultos.</p>
          </div>
          <div className="footer-contact">
            <a href="mailto:hola@sergiofuentespsicologia.com">hola@sergiofuentespsicologia.com</a>
            <a href="https://instagram.com/sergio.psicologia">@sergio.psicologia</a>
            <span>© 2026. Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
