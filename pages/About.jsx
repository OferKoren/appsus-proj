export function About() {
    return (
        <section className="about">
            <h1>About Us</h1>
            <div className="creators">
                <div className="creator-card">
                    <img src="./assets/img/image.png" alt="Eran Yosef" className="creator-img" />
                    <h3>Eran Yosef</h3>
                    <p>Full Stack Web Developer</p>
                    <p>A passionate developer specializing in creating interactive web applications and user-friendly interfaces.</p>
                    <a href="https://github.com/eranyosef2" target="_blank" className="github-link">
                        <i className="fa-brands fa-github"></i> GitHub
                    </a>
                </div>
                <div className="creator-card">
                    <div className="placeholder-img"></div> {/* your image ahsheli */}
                    <h3>Ofer Koren</h3>
                    <p>Full Stack Web Developer</p>
                    <p></p>
                    <a href="https://github.com/OferKoren" target="_blank" className="github-link">
                        <i className="fa-brands fa-github"></i> GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
