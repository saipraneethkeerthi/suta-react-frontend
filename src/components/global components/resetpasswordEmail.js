import React from 'react';
import {handleValidateEmail} from './signup'

const Email = () => {
    return (
        <div className="container">
            <div className="card">
                <input type="email" className="form-control mb-3" placeholder="Enter email" />
                <button type="submit" className="btn btn-primary" onClick="handleValidateEmail()">Submit</button>
            </div>
        </div>
    );
}

export default Email;
