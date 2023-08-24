export const renderProfileOverview = (props) => (

    <>
      <div className='profile'>
         <h1>Welcome {props.name} </h1>
         <p><strong>Company:</strong> {props.company}</p>
         <p><strong>Skills:</strong> {props.skills.map(skillObj => skillObj.skill).join(", ")}</p>
         <p><strong>Instagram:</strong> {props.instagram}</p>
         <p><strong>Twitter:</strong> {props.twitter}</p>
         <p><strong>LinkedIn:</strong> {props.linkedin}</p>
         <p><strong>About:</strong> {props.about}</p>
         <p><strong>About:</strong> <img src={props.photo} alt={props.name} /> </p>
         <button type="button" onClick={props.deleteUser}>Delete Profile</button>
         <button type="button" onClick={props.toggleEditing}>Update Profile</button> {/* Add this line */}
       </div>
     </>
  );