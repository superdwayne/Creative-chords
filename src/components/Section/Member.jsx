import React from "react";

function Members(props) {
  const { twitter, instagram, linkedin } = props;

  // Construct the full Twitter URL
  const twitterHandle = twitter ? `https://twitter.com/${twitter}` : null;

  return (
    /* Write logic to select a random creative */
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
        </section>
        <div className="Creative_profile">
          <img src={props.imageSrc} alt={props.imageSrcAlt} />
          <h1 className="Creative_name">{props.nameMain}</h1>
          <small>{props.company}</small>
          <p>{props.introDescription}</p>
          <section className="social">
            {instagram && (
              <section>
                <a href={instagram} target="_blank">
                  <img src="/images/insta.png" alt="insta" />
                </a>
              </section>
            )}
            {linkedin && (
              <section>
                <a href={linkedin} target="_blank">
                  <img src="/images/in.png" alt="Linked-in" />
                </a>
              </section>
            )}
            {twitter && (
              <section>
                <a href={twitterHandle} target="_blank">
                  <img src="/images/tw.png" alt="Twitter" />
                </a>
              </section>
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default Members;
