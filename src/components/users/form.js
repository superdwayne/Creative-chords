export const renderUpdateForm = () => (
    <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>  
                  <h1>NAME</h1>
                  <TextField onChange={(e) => setName(e.target.value)} defaultValue={name} />
                  {/* <input type="text" value={name}  onChange={(e) => setName(e.target.value)}  /> */}
                  <h1>SKILLS</h1>
                  <div className="skills-grid">
                    {skills.map((skillObj, index) => (
                      <div key={`skill-${index}`}>
                        <input
                          type="text"
                          value={skillObj.skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                        /> <button type="button" onClick={() => removeSkill(index)}>Remove this skill</button>
                      </div>
                    ))}
                  </div>
                  {auth.currentUser && isProfileCreated ? <input type="submit" value={isUpdating ? 'Update profile' : 'Complete profile'} /> : null}
    
                  <button type="button" className='mb20' onClick={addSkill}>Add another skill</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </>
              )}
    
              {step === 2 && (
                <>
                  <h1>Company</h1>
                  <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <button type="button" onClick={prevStep}>Previous</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </>
              )}
    
              {step === 3 && (
                <>
                  <h1>SOCIAL</h1>
                  <input
                    type="text"
                    placeholder="Instagram Handle"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Twitter Handle no @"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                  <button type="button" onClick={prevStep}>Previous</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </>
              )}
    
              {step === 4 && (
                <>
                  <h1>FEATURED CREATIVE</h1>
                  <label>
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                    />
                    <span>I want to be featured</span>
                  </label>
                  {featured && (
                    <>
                    <div>
              <h3>Current Featured Image:</h3>
              <img src={photo} alt="" />
            </div>
            <label>
              <span>Use a different image URL:</span>
              <input
                type="text"
                placeholder="Image URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </label>
                      <h1>BIO</h1>
                      <input
                        type="text"
                        placeholder="Bio"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </>
                  )}
                  <button type="button" onClick={prevStep}>Previous</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </>
              )}
    
              {step === 5 && (
                <>
    
                  <h1>Review Your Profile</h1>
                  <div>
                    <h3>Name</h3>
                    <p>{name}</p>
                  </div>
                  {featured && (
                    <div>
                      <h3>Photo</h3>
                      <img src={photo} alt={name} />
                    </div>
                  )}
                  <div>
                    <h3>Company</h3>
                    <p>{company}</p>
                  </div>
                  <div>
                    <h3>Skills</h3>
                    {skills.map((skillObj, index) => (
                      <p key={`skill-${index}`}>{skillObj.skill}</p>
                    ))}
                  </div>
                  <div>
                    <h3>Instagram</h3>
                    <p>{instagram}</p>
                  </div>
                  <div>
                    <h3>Twitter</h3>
                    <p>{twitter}</p>
                  </div>
                  <div>
                    <h3>LinkedIn</h3>
                    <p>{linkedin}</p>
                  </div>
                  <button type="button" onClick={prevStep}>Previous</button>
                  {auth.currentUser ? <input type="submit" value={isUpdating ? 'Update profile' : 'Complete profile'} /> : null}
                  {isProfileCreated ? <button type="button" onClick={deleteUser}>Delete Profile</button> : null} {/* Show delete button only if profile is created */}
                </>
              )}
            </form>
      );