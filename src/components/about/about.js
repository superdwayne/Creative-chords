import Grid from "@mui/material/Grid"; // Grid version 1
import './about.css'

export default function About() {
  return (
 
     <main className="container intropadding">
<Grid container spacing={2} alignItems="center" >
      <Grid xs={12} md={5} display="block">
     
                 <p>
                 ABOUT CREATIVE CHORDS
                  </p>
            
                  <h3>
                  Well to start we're not a band, but a collective of Creative Technologists
                  </h3>

                  <p>Empowering Creatives WorldwideOur mission is to build a thriving global community and showcase for creative professionals across all fields of technology. We exist to connect and empower these remarkable minds to inspire each other and move the industry forward.</p>
                  <p>Discover Endless InspirationImmerse yourself in the groundbreaking work of creatives from every corner of the world. Our one-of-a-kind profiles allow you to get to know the people behind creative innovation across all mediums. Find fresh inspiration from diverse talents and perspectives.</p>
                  <p>Leave Your MarkOur worldwide community provides opportunities for mentorship, networking, and discovery. Connect with other pioneering creatives, exchange feedback, work together, and showcase your accomplishments. Leave your creative mark alongside fellow innovators.</p>
              
      </Grid>
      <Grid xs={12} md={7} display="flex" alignItems="center">
          <img src="images/DPM.png" alt="DPM" className="aboutimg" />
          
      </Grid>
    </Grid>

    
      {/* <main
        className="container"
        style={{
          display: "block",
          height: "100vh",
          backgroundColor: "#000",
        }}
      >
        <h1>
          THE <br /> MISSION
        </h1>
        <section className="mission">
          <h1>1</h1>
          <h3>
            Empowering Creatives Worldwide
            <br />
            Our mission is to build a thriving global community and showcase for
            creative professionals across all fields of technology. We exist to
            connect and empower these remarkable minds to inspire each other and
            move the industry forward.{" "}
          </h3>
        </section>
        <section className="mission">
          <h1>2</h1>
          <h3>
          Discover Endless Inspiration
          <br />
          Immerse yourself in the groundbreaking work of creatives from every
          corner of the world. Our one-of-a-kind profiles allow you to get to
          know the people behind creative innovation across all mediums. Find
          fresh inspiration from diverse talents and perspectives.
        </h3>
        </section>
        
        <section className="mission">
          <h1>3</h1>
          <h3>
          Leave Your Mark
          <br />
          Our worldwide community provides opportunities for mentorship,
          networking, and discovery. Connect with other pioneering creatives,
          exchange feedback, work together, and showcase your accomplishments.
          Leave your creative mark alongside fellow innovators.
        </h3>
        </section>
        
      </main> */}
      </main>
  );
}
