import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import './search.css'

export default function Search() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const blurTimeoutRef = useRef(null); // Reference to store the timeout

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getDocs(collection(db, 'testusers'));
            const fetchedUsers = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUsers(fetchedUsers);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredUsers = searchTerm.length > 1
        ? users.filter(user => {
            const skills = user.skills || [];
            return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        })
        : [];

    const predefinedSearchTerms = ["WebGL", "AR", "Unity", "three.js"];

    const handlePredefinedSearchClick = (term) => {
        setSearchTerm(term);
    };

    const handleInputBlur = () => {
        blurTimeoutRef.current = setTimeout(() => {
            setInputFocused(false);
        }, 200); // 200ms delay
    };

    const handleInputFocus = () => {
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current); // Clear the timeout if it's still pending
        }
        setInputFocused(true);
    };

    return (
        <>
            {loading ? (
                <div className="pulse"></div>
            ) : (
                <>
                <div className="search-container">
                    <input
                        className='Search'
                        type="text"
                        placeholder="Search by skill e.g WebGL"
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    {searchTerm && (
                        <span className="clear-icon" onClick={() => setSearchTerm('')}>X</span>
                    )}
                </div>
                    {inputFocused && filteredUsers.length === 0 && (
                      <><p>Popular searches</p><br />
                      <div className="predefined-search-terms ">

                  {predefinedSearchTerms.map((term, index) => (
                    <span
                      key={index}
                      className="predefined-term Downey"
                      onClick={() => handlePredefinedSearchClick(term)}
                    >
                      {term}
                    </span>
                  ))}
                </div></>
                    )}
                    {searchTerm.length > 1 && (
                        <div className="table-container">
                            {filteredUsers.map((user, index) => (
                                <div className="table-row" key={index}>
                                    <div className="row-item">{user.name}</div>
                                    <div className="row-item">{user.company}</div>
                                    <div className="row-item hide-on-mobile" >
                                        <p style={{ padding: 5, backgroundColor: index % 2 === 0 ? '#000' : '#000', }}>
                                            {user.skills && user.skills.length > 0 ? user.skills.join(', ') : 'No skills'}
                                        </p>
                                    </div>
                                    <div className="row-item searchsocial hide-on-mobile">
                                        {user.linkedin && (
                                            <a href={user.linkedin} target="_blank" rel="noreferrer">
                                                <img className='indexsocial' src="/images/in.png" alt="Linked-in" />
                                            </a>
                                        )}
                                        {user.twitter && (
                                            <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noreferrer">
                                                <img className='indexsocial' src="/images/tw.png" alt="Twitter" />
                                            </a>
                                        )}
                                        {user.instagram && (
                                            <a href={`https://www.instagram.com/${user.instagram}`} target="_blank" rel="noreferrer">
                                                <img className='indexsocial' src="/images/insta.png" alt="Instagram" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
}
