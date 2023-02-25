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
          <p>{props.introDescription}</p>
          <div className='Social_nav'>
        <ul>
          <li><a href={props.website} target="blank" title="DESCRIPTION OF LINK/WEBSITE"> <img src={require('./Icons/website_icon.png')} alt='' border="0" /></a></li>
          <li><a href={props.instagram} target="blank" title="DESCRIPTION OF LINK/WEBSITE"> <img src={require('./Icons/instagram_icon.png')} alt='' border="0" /></a></li>
          <li><a href={props.twitter} target="blank" title="DESCRIPTION OF LINK/WEBSITE"> <img src={require('./Icons/twitter_icon.png')} alt='' border="0" /></a></li>
          <li><a href={props.linkedin} target="blank" title="DESCRIPTION OF LINK/WEBSITE"> <img src={require('./Icons/linkedin_icon.png')} alt='' border="0" /></a></li>
          </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Members;
