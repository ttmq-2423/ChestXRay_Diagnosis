import React, { useState, useContext } from "react";
import { HandleContactApi } from '../../services/contactService';
import { UserContext } from '../../context/UserContext'; 
import { toast, ToastContainer } from 'react-toastify';
import './Contact.css';

const Contact = () => {
    const { user } = useContext(UserContext); 

    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subject.trim() || !body.trim()) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }
        setSubject('');
        setBody('');
        try {
            const response = await HandleContactApi(user.email, subject, body);
            if (response.errCode === 0) {
                toast.success(response.message, {
                    position: "top-center",
                    autoClose: 2000, 
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    backgrough: null 
                });

                
                setError(''); 
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error('Lỗi khi gửi email:', error);
            setError('Lỗi khi gửi email. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="body">
            <div className="contact-container">
            <div className="contact-info">
                <h2>Contact Us</h2>
                <p>You can contact us via:</p>
                <ul>
                    <li>Phone number: 0338486003</li>
                    <li>Email addresses:
                        <ul>
                            <li>21522540@gm.uit.edu.vn</li>
                            <li>21520458@gm.uit.edu.vn</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="contact-form">
                <h2>Or send your questions to us:</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Message:</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Send</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
            <ToastContainer />
        </div>
        </div>
        
    );
};

export { Contact };
