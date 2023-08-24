import './footer.css'
import { Link, useLocation } from 'react-router-dom';
import EmailSubscription from './email';
import Nav from '../Top/Nav';
import Grid from "@mui/material/Grid"; // Grid version 1

export default function Footer(props) {
    return (

        <footer className='footer'  ><Grid container spacing={2} alignItems="START">
            <Grid xs={12} md={10} display="flex">
                <main className="intro">
                   <p>
                            CREATIVE CHORDS
                        </p>
                </main>
            </Grid>
            <Grid xs={12} md={2} display="flex" alignItems="end">
                <section> 
                    <p>INSTAGRAM</p>
                    <p>TWITTER</p>
                    <p>TERMS & CONDITIONS</p>
                    <p>PRIVACY POLICY</p>
                </section>  

               
            </Grid>
            {/* <section>
                    <EmailSubscription /> 
                </section> */}
        </Grid>
                {/* <img className='footerlogo' src={props.logo} /> */}
                {/* <div className="grid-container">
                    <div className="grid-item">
                        <p> Creative Chords - an index of Creative Technologists from around the world.</p>
                        <div className="social hide-on-mobile">
                            <a href='https://www.instagram.com/cre8tive_chords/' target="_blank">
                                <img src="/images/insta.png" alt="insta" />
                            </a>
                            <img src="/images/in.png" alt="Linked-in" />
                            <img src="/images/tw.png" alt="Twitter" />
                        </div>
                    </div>
                    <div className="grid-item">
                        <nav className='footerNav'>
                            <Link className='about' to="/about">About</Link>
                            <Link className='about' to="/privacy-policy">Privacy</Link>
                            <Link className='about' to="/terms-and-conditons">Terms</Link>
                        </nav>
                    </div>
                    <div className="grid-item">    <p> Not quite ready to join?</p> <p>Sign up to keep up to date with our community</p><EmailSubscription /> </div>
                </div> */}

            </footer>
    );
  }