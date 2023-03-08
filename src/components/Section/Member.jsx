import React from "react";
function Members(props) {
  return (
    <>
      <section className="Creative">
        <section className="Creative_name_wrapper">
          <div className="Creative_name_bk">
            <h3>{props.bkname}</h3>
            <h3>{props.bkname}</h3>
            <h3>{props.bkname}</h3>
          </div>
          <div className="Creative_name_bk">
            <h3>{props.bkname}</h3>
            <h3>{props.bkname}</h3>
            <h3>{props.bkname}</h3>
          </div>
          <div className="Creative_name_bk">
            <h3>{props.bkname}</h3>
            <h3>{props.bkname}</h3>
            <h3>{props.bkname}</h3>
          </div>
          <div className="Creative_name_bk">
            <h3>{props.bkname}</h3>
            <h3>{props.bkname}</h3>
            <h3>{props.bkname}</h3>
          </div>
        </section>
        <div className="Creative_profile">
          <img src={props.imageSrc} alt={props.imageSrcAlt} />
          <h1 className="Creative_name">{props.nameMain}</h1>
          
          <small>{props.company}</small>
          <section className="social">
            <section>
              <img src="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph.png"  alt="insta" />
              </section>
              <section>
              <img src="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph.png"  alt="insta" />
              </section>
          </section>
          <p>{props.introDescription}</p>
        </div>
      </section>
    </>
  );
};

export default Members;
